import * as cheerio from "cheerio";
import {
  DefinitionGroup,
  Entry,
  Lang,
  Pronunciations,
  Sense,
  SenseExample,
} from "./types/type";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import { randomId } from "./utils";
// 页面根元素
type DOMNode = cheerio.Cheerio<cheerio.Element>;

export class CambridgeParser {
  $: cheerio.CheerioAPI;
  domEntry: DOMNode;
  baseURL: string =
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/";
  allIdiomsUrl: Record<string, string[]> = {};
  allPhrasalVerbsUrl: Record<string, string[]> = {};
  isWord: string = "";
  constructor(props: { html: string }, isWord: string = "") {
    this.$ = cheerio.load(props.html);
    this.domEntry = this.$(".entry");
    this.isWord = isWord;
  }
  // 一个词条
  getEntry(): Entry {
    const text = this.$(".headword").first().text();
    // 区分是词条，成语，动词短语
    const classMap: any = {
      idioms: ".pr.idiom-block",
      phrasal_verbs: ".pv-block",
    };
    const definitionGroups = this.$(
      this.isWord ? classMap[this.isWord] : ".pr.entry-body__el"
    )
      .map((index, el) => {
        const $el = this.$(el);
        return this.getDefinitionGroups($el);
      })
      .toArray();

    return {
      id: randomId(),
      text: text,
      definitionGroups,
    };
  }
  // 获取释义组
  getDefinitionGroups(dom: DOMNode): DefinitionGroup {
    const classMap: any = {
      idioms: ".idiom-body.didiom-body",
      phrasal_verbs: ".pv-body.dpv-body",
    };
    const partOfSpeech = dom.find(".pos.dpos").text();
    const id: string = randomId();
    const senses: Sense[] = dom
      .find(this.isWord ? classMap[this.isWord] : ".pr.dsense")
      .map((index, el) => {
        const $el = this.$(el);
        return this.getSense($el, true);
      })
      .toArray();
    this.getIdioms(dom, id);
    this.getPhrasalVerbs(dom, id);
    return {
      id: id,
      partOfSpeech,
      senses: senses,
      idioms: [],
      phrasalVerbs: [],
      pronunciations: this.getPronunciation(dom),
    };
  }
  // 获取释义
  getSense(dom: DOMNode, isParent: boolean): Sense {
    if (isParent) {
      const text = dom.find(".dsense_h .guideword span").text();
      const children: Sense[] = dom
        .find(".def-block.ddef_block")
        .map((index, el) => {
          const $el = this.$(el);
          return this.getSense($el, false);
        })
        .toArray();

      return {
        id: randomId(),
        text: {
          id: randomId(),
          rawText: text,
          lang: Lang.en,
        },
        usageText: "",
        labels: [],
        grammarTraits: this.getGrammarTraits(dom),
        synonyms: [],
        opposites: [],
        relatedEntries: [],
        examples: [],
        children,
      };
    } else {
      const englishText = dom.find(".ddef_h .def.ddef_d.db").text();
      const zhText = dom.find(".def-body .trans").text();
      const examples: SenseExample[] = dom
        .find(".examp.dexamp")
        .map((index, el) => {
          const $el = this.$(el);
          return this.getExamples($el);
        })
        .toArray();
      let sensesItem: Sense = {
        id: randomId(),
        text: {
          id: randomId(),
          rawText: englishText,
          lang: Lang.en,
          translation: {
            id: randomId(),
            rawText: zhText,
            lang: Lang.zh,
          },
        },
        usageText: "",
        labels: [],
        grammarTraits: [],
        synonyms: [],
        opposites: [],
        relatedEntries: [],
        examples,
        children: [],
      };

      return sensesItem;
    }
  }
  // 获取例句
  getExamples(dom: DOMNode): SenseExample {
    const englishText = dom.find(".eg.deg").text();
    const zhText = dom.find(".trans.dtrans.dtrans-se.hdb").text();
    return {
      id: randomId(),
      text: {
        id: randomId(),
        rawText: englishText,
        lang: Lang.en,
        translation: {
          id: randomId(),
          rawText: zhText,
          lang: Lang.zh,
        },
      },
      children: [],
    };
  }
  // 获取词性
  getGrammarTraits(dom: DOMNode): string[] {
    const el = dom.find(".gram.dgram").first();
    const arr = el
      .text()
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((el) => el.trim())
      .filter((el) => el.length > 0);

    return arr;
  }
  // 获取发音
  getPronunciation(dom: DOMNode): Pronunciations[] {
    const pronunciationList = dom
      .find(".dpron-i")
      .map((index, el) => {
        const $el: any = this.$(el);
        // 发音（英式还是美式）
        const geoKind: string = $el.find(".region.dreg").text();
        // 音标
        const phoneticAlphabet = $el.find(".ipa.dipa.lpr-2.lpl-1").text();
        // 语音url
        const url = $el.find("source").attr("src");
        return {
          id: randomId(),
          geoKind: geoKind,
          phoneticAlphabet: phoneticAlphabet,
          url: url,
        };
      })
      .toArray();
    return pronunciationList;
  }
  // 成语（idioms）
  getIdioms(dom: DOMNode, id: string) {
    const idiomsList = dom
      .find(".idioms .item.lc.lc1.lc-xs6-12.lpb-10.lpr-10")
      .map((index, el) => {
        return this.$(el).find("a").attr("href");
      })
      .toArray();
    let allIdioms = idiomsList.map((item) => {
      let urlItem = item.split("/");
      return this.baseURL + urlItem[urlItem.length - 1];
    });
    this.allIdiomsUrl[id] = allIdioms;
  }
  // 短语动词
  getPhrasalVerbs(dom: DOMNode, id: string) {
    const phrasalVerbsList = dom
      .find(".phrasal_verbs .item.lc.lc1.lc-xs6-12.lpb-10.lpr-10")
      .map((index, el) => {
        return this.$(el).find("a").attr("href");
      })
      .toArray();
    let allphrasalVerbs = phrasalVerbsList.map((item) => {
      let urlItem = item.split("/");
      return this.baseURL + urlItem[urlItem.length - 1];
    });
    this.allPhrasalVerbsUrl[id] = allphrasalVerbs;
  }
}
