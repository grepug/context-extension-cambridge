import { CambridgeParser } from "./CambridgeParser";
import type { Entry } from "./types/type";
import type { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import axios from "axios";

interface CambridgeFetcherParseResult {
  entry: Entry;
  entryItems: LookUpExtensionEntryItem[];
}

// 用来获取词条详情，以及词条的联想词
export class CambridgeFetcher {
  static baseURL: string =
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/";

  url: string;

  constructor(props: { entry: string }) {
    this.url = CambridgeFetcher.baseURL + props.entry;
  }

  public async parse(): Promise<
    CambridgeFetcherParseResult
  > {
    // 获取页面html
    let html = await this.fetch();
    let parser = new CambridgeParser({ html: html });
    // 词条
    let entry = parser.getEntry();
    // 联想词
    // const similarWords = parser.getMoreTranslations();
    // console.log(similarWords, "similarWords");

    // 成语url列表
    let allIdiomsList = Object.entries(parser.allIdiomsUrl);
    // 短语动词url列表
    let allPhrasalVerbsLsit = Object.entries(parser.allPhrasalVerbsUrl);
    // 获取成语和短语动词的释义
    for (const [id, urls] of allIdiomsList) {
      let htmlList = await Promise.all(urls.map((url) => this.fetch(url)));
      htmlList.forEach((html) => {
        let newParser = new CambridgeParser({ html }, "idiom");
        let newEntry = newParser.getEntry();
        let index = entry.definitionGroups.findIndex(
          (group) => group.id === id,
        );
        entry.definitionGroups[index].idioms.push(newEntry);
      });
    }
    for (const [id, urls] of allPhrasalVerbsLsit) {
      let htmlList = await Promise.all(urls.map((url) => this.fetch(url)));
      htmlList.forEach((html) => {
        let newParser = new CambridgeParser({ html }, "phrasal_verb");
        let newEntry = newParser.getEntry();
        let index = entry.definitionGroups.findIndex(
          (group) => group.id === id,
        );
        entry.definitionGroups[index].phrasalVerbs.push(newEntry);
      });
    }

    let entryItems: LookUpExtensionEntryItem[] = parser.getMoreTranslations();
    // console.log(entryItems, "entryItems");
    
    return {
      entry,
      entryItems,
    };
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
}
