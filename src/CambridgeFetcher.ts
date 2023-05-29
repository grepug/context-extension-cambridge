import { CambridgeParser } from "./CambridgeParser";
import type { Entry } from "./types/type";
import type { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import { CambridgeSimilar } from "./CambridgeSimilar";
import axios from "axios";
import { randomId } from "./utils";
export class CambridgeFetcher {
  static baseURL: string =
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/";
  static qbaseURL: string =
    "https://dictionary.cambridge.org/spellcheck/english-chinese-simplified/?q=";
  url: string;
  qurl: string
  constructor(props: { entry: string }) {
    this.url = CambridgeFetcher.baseURL + props.entry;
    this.qurl = CambridgeFetcher.qbaseURL + props.entry;
  }

  public async parse(): Promise<Entry> {
    // 获取页面html
    let html = await this.fetch();
    let parser = new CambridgeParser({ html: html });
    // 词条
    let entry = parser.getEntry();
    // 联想词
    const similarWords = parser.getMoreTranslations()
    console.log(similarWords, 'similarWords');
    
    // 成语url列表
    let allIdiomsList = Object.entries(parser.allIdiomsUrl);
    // 短语动词url列表
    let allPhrasalVerbsLsit = Object.entries(parser.allPhrasalVerbsUrl);
    // 获取成语和短语动词的释义
    for (const [id, urls] of allIdiomsList) {
      let htmlList = await Promise.all(urls.map((url) => this.fetch(url)));
      htmlList.forEach((html) => {
        let newParser = new CambridgeParser({ html }, "idioms");
        let newEntry = newParser.getEntry();
        let index = entry.definitionGroups.findIndex(
          (group) => group.id === id
        );
        entry.definitionGroups[index].idioms.push(newEntry);
      });
    }
    for (const [id, urls] of allPhrasalVerbsLsit) {
      let htmlList = await Promise.all(urls.map((url) => this.fetch(url)));
      htmlList.forEach((html) => {
        let newParser = new CambridgeParser({ html }, "phrasal_verbs");
        let newEntry = newParser.getEntry();
        let index = entry.definitionGroups.findIndex(
          (group) => group.id === id
        );
        entry.definitionGroups[index].phrasalVerbs.push(newEntry);
      });
    }
    return entry
  }
  // 获取相似单词列表
  async similarParse() {
    let html = await this.fetch();
    console.log(html, 'html');
    let parser = new CambridgeSimilar({ html: html });
    let entryItems = parser.getEntryItems();
    return entryItems;
  }
  async fetch(url?: string): Promise<string> {
    const link = url ?? this.url;
    if (typeof process != "undefined") {
      const res = await axios.get(link);
      return res.data;
    } else {
      const res = await fetch(link);
      return res as any;
    }
  }
  // 当前页面是不是首页
  async isIndexPage(): Promise<boolean> {
    let html = await this.fetch();
    if (html.includes('Cambridge Dictionary brings intermediate and advanced learners of English regularly updated words and meanings with thousands of carefully chosen example sentences from the ')) {
      return true;
    }
    return false;
  }
  // 用户输入的单词是不是正确的单词
  async isCorrectWord() {
    let isIndexPage = await this.isIndexPage();
    if (isIndexPage) {
      return this.similarParse()
    } else {
    }
    return [];
  }

}
