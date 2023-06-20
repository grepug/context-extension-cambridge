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
  baseURL: string =
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/";
  allIdiomsUrl: Record<string, string[]> = {};
  allPhrasalVerbsUrl: Record<string, string[]> = {};
  isWord: string = "";
  constructor(props: { html: string }, isWord: string = "") {
    this.$ = cheerio.load(props.html);
    this.isWord = isWord;
  }
  // 一个词条
  getEntry(): Entry {
    const text = this.$(".headword").first().text();
    //联想词
    // 区分是词条，成语，动词短语
    const classMap: any = {
      idiom: ".pr.idiom-block",
      phrasal_verb: ".pv-block",
    };
    const definitionGroups = this.$(
      this.isWord ? classMap[this.isWord] : ".pr.entry-body__el"
    )
      .map((index, el) => {
        const $el = this.$(el);
        return this.getDefinitionGroups($el);
      })
      .toArray();
    // console.log(similarWords, 'similarWords');
    return {
      id: randomId(),
      text: text,
      definitionGroups
    };
  }
  // 获取释义组
  getDefinitionGroups(dom: DOMNode): DefinitionGroup {
    const classMap: any = {
      idiom: ".idiom-body.didiom-body",
      phrasal_verb: ".pv-body.dpv-body",
    };
    const partOfSpeech = dom.find(".pos.dpos").map((index, el) => {
      return this.$(el).text()
    }).toArray().join(',');
    const id: string = randomId();
    const senses: Sense[] = dom
      .find(this.isWord ? classMap[this.isWord] : ".pr.dsense")
      .map((index, el) => {
        const $el = this.$(el);
        const text = $el.find(".dsense_h .guideword span").text().trim();
        return this.formatSense(this.getSense($el, true));
      })
      .toArray();
    this.getIdioms(dom, id);
    this.getPhrasalVerbs(dom, id);
    return {
      id: id,
      partOfSpeech: this.isWord ? this.isWord.replace("_", " ") : partOfSpeech,
      senses: senses,
      idioms: [],
      phrasalVerbs: [],
      pronunciations: this.getPronunciation(dom),
      desc: dom.find(".irreg-infls.dinfls").text().trim(),
    };
  }
  // 获取释义
  getSense(dom: DOMNode, isParent: boolean): Sense {
    if (isParent) {
      const text = dom.find(".dsense_h .guideword span").text().trim();
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
          translation: {
            id: randomId(),
            rawText: '',
            lang: Lang.zh,
          },
        },
        // levelText: this.getLevelTraits(dom),
        usageText: "",
        labels: [],
        grammarTraits: this.getGrammarTraits(dom, 'parent'),
        synonyms: this.getVariousWords(dom, 'synonym').length ? this.getVariousWords(dom, 'synonym') : this.getVariousWords(dom, 'synonyms'),
        opposites: this.getVariousWords(dom, 'opposite').length ? this.getVariousWords(dom, 'opposite') : this.getVariousWords(dom, 'opposites'),
        relatedEntries: this.getVariousWords(dom, 'see_also').length ? this.getVariousWords(dom, 'see_also') : this.getVariousWords(dom, 'compare'),
        examples: [],
        children,
      };
    } else {
      const englishText = this.replaceStr(dom.find(".ddef_h .def.ddef_d.db").text(), /\s+/g, ' ').trim()
      const zhText = dom.find(".def-body>.trans").text().trim();
      let dvar = dom.find(".ddef_h .var.dvar").text().trim();
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
          rawText: dvar ? dvar + englishText : englishText,
          lang: Lang.en,
          translation: {
            id: randomId(),
            rawText: zhText,
            lang: Lang.zh,
          },
        },
        levelText: this.getLevelTraits(dom),
        usageText: "",
        labels: this.getSenseLabels(dom, 'ddef_h'),
        grammarTraits: this.getGrammarTraits(dom, 'children'),
        synonyms: this.getVariousWords(dom, 'synonym').length ? this.getVariousWords(dom, 'synonym') : this.getVariousWords(dom, 'synonyms'),
        opposites: this.getVariousWords(dom, 'opposite').length ? this.getVariousWords(dom, 'opposite') : this.getVariousWords(dom, 'opposites'),
        relatedEntries: this.getVariousWords(dom, 'see_also').length ? this.getVariousWords(dom, 'see_also') : this.getVariousWords(dom, 'compare'),
        examples,
        children: [],
      };
      let senseNode = dom.find(".ddef_h .def.ddef_d.db")
      // 判断senseNode的父元素是否含有.phrase-block
      const phraseBlock = senseNode.parents('.phrase-block')
      if (phraseBlock.length) {
        let phraseHead = phraseBlock.find('.phrase-title').text().trim()
        sensesItem = {
          id: randomId(),
          text: {
            id: randomId(),
            rawText: phraseHead,
            lang: Lang.en
          },
          levelText: phraseBlock.find('.epp-xref').text().trim(),
          usageText: "",
          labels: phraseBlock
            .find(`.lab.dlab`)
            .text()
            .split(",")
            .map((el) => el.trim())
            .filter((el) => el.length > 0),
          grammarTraits: this.getGrammarTraits(dom, 'children'),
          synonyms: this.getVariousWords(dom, 'synonym').length ? this.getVariousWords(dom, 'synonym') : this.getVariousWords(dom, 'synonyms'),
          opposites: this.getVariousWords(dom, 'opposite').length ? this.getVariousWords(dom, 'opposite') : this.getVariousWords(dom, 'opposites'),
          relatedEntries: this.getVariousWords(dom, 'see_also').length ? this.getVariousWords(dom, 'see_also') : this.getVariousWords(dom, 'compare'),
          examples: [],
          children: [sensesItem],
        }
      }

      return sensesItem;
    }
  }
  // 获取蓝色背景部分
  // 获取例句
  getExamples(dom: DOMNode): SenseExample {
    const englishText = dom.find(".eg.deg").text().trim();
    const zhText = dom.find(".trans.dtrans.dtrans-se.hdb").text().trim();
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
  // 获取语法标签
  getGrammarTraits(dom: DOMNode, type: string): string[] {
    let el = dom.find(".dsense_h .dgram").first();
    if (type === 'children') {
      el = dom.find(".ddef_h .dgram").first();
    }
    const arr = el
      .text()
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map((el) => el.trim())
      .filter((el) => el.length > 0);

    return arr;
  }
  // 获取等级标签
  getLevelTraits(dom: DOMNode): string {
    return dom
      .find(".ddef_h .dxref")
      .text()
  }
  // 获取释义标签
  getSenseLabels(dom: DOMNode, className: string): string[] {
    // 如果包含.x-h.dx-h，就返回
    if (dom.find(`.${className} .x-h.dx-h`).length) {
      return []
    }
    // ddef_h
    return dom
      .find(`.${className} .lab.dlab`)
      .text()
      .split(",")
      .map((el) => el.trim())
      .filter((el) => el.length > 0);
  }
  // 获取近义词,反义词,相关词
  getVariousWords(dom: DOMNode, className: string): string[] {
    let variousWords = dom
      .find(`.${className} .item.lc.lc1.lpb-10.lpr-10`)
      .map((index, el) => {
        const $el = this.$(el);
        return $el.text();
      })
      .toArray();
      // 如果dom的下一个兄弟元素包含className，就找dom的下一个兄弟元素
      if (dom.next(`.${className}`).length) {
        variousWords = dom
          .next().find(`.${className} .item.lc.lc1.lpb-10.lpr-10`)
          .map((index, el) => {
            const $el = this.$(el);
            return $el.text();
          })
          .toArray();
      }
      // 遍历variousWords，如果字符串中间有两个空格，就替换成一个空格
      variousWords = variousWords.map((el) => {
        if (el.indexOf("  ") > -1) {
          return el.replace("  ", " ");
        }
        return el;
      });
    return variousWords
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
        const phoneticAlphabet = $el.find(".pron.dpron").text();
        // 获取该元素兄弟元素(必须是相邻的<span>元素并且这个span没有.dpron-i类) 子元素.pron.dpron的文本
        const text = $el
          .nextUntil(".dpron-i")
          .filter("span")
          .not(".dpron-i")
          .find(".pron.dpron")
          .text();

        // 语音url
        const url = $el.find("source").attr("src");
        return {
          id: randomId(),
          geoKind: geoKind,
          phoneticAlphabet: phoneticAlphabet + (text ? `,${text}` : ""),
          url: url,
        };
      })
      .toArray();
    return pronunciationList;
  }
  // 成语（idioms）
  getIdioms(dom: DOMNode, id: string) {
    let idiomsList = dom
      .find(".idioms .item.lc.lc1.lpb-10.lpr-10")
      .map((index, el) => {
        return this.$(el).find("a").attr("href");
      })
      .toArray()
    if (!idiomsList.length) {
      idiomsList = dom.find(".idiom .item.lc.lc1.lpb-10.lpr-10")
        .map((index, el) => {
          return this.$(el).find("a").attr("href");
        }).toArray()
    }
    let allIdioms = idiomsList.map((item) => {
      let urlItem = item.split("/");
      return this.baseURL + urlItem[urlItem.length - 1];
    });
    this.allIdiomsUrl[id] = allIdioms;
  }
  // 短语动词
  getPhrasalVerbs(dom: DOMNode, id: string) {
    let phrasalVerbsList = dom
      .find(".phrasal_verbs .item.lc.lc1.lpb-10.lpr-10")
      .map((index, el) => {
        return this.$(el).find("a").attr("href");
      })
      .toArray();
    if (!phrasalVerbsList.length) {
      phrasalVerbsList = dom.find(".phrasal_verb .item.lc.lc1.lpb-10.lpr-10")
        .map((index, el) => {
          return this.$(el).find("a").attr("href");
        }).toArray()
    }
    let allphrasalVerbs = phrasalVerbsList.map((item) => {
      let urlItem = item.split("/");
      return this.baseURL + urlItem[urlItem.length - 1];
    });
    this.allPhrasalVerbsUrl[id] = allphrasalVerbs;
  }
  // 更多简体中文翻译
  getMoreTranslations(): LookUpExtensionEntryItem[] {
    // 获取该页面上一个类名为.i-amphtml-accordion-content的元素
    const entryItems = this.$('aside').first()
      .find("ul.hax.hul-u").first().find('li')
      .map((index, el) => {
        const $el = this.$(el);
        const title = $el.find("a").text().trim();
        const url = $el.find("a").attr("href")
        return {
          id: randomId(),
          title,
          url: url ? 'https://dictionary.cambridge.org' + url : "",
          description: ""
        };
      })
      .toArray();
    return entryItems;
  }
  // 获取词条描述
  getEntryDescription(dom: DOMNode): string {
    return dom.find(".inf-group.dinfg").text().trim();
  }
  // 判断在dom中是否存在某个类名
  hasClass(dom: DOMNode, className: string): boolean {
    return dom.find(`.${className}`).length > 0;
  }
  // 替换字符串中的空格，换行符，制表符等等（参数传入），替换成想要的格式（参数传入）
  replaceStr(str: string, reg: RegExp, replaceStr: string): string {
    return str.replace(reg, replaceStr);
  }
  // 格式化释义sense的层级(如果senses中的每一项的text.rawText不存在，则把children中的项放到senses中)
  formatSense(sense: Sense): Sense[] {
    if (!sense.text.rawText) {
      return sense.children;
    }
    return [sense];
  }
}
