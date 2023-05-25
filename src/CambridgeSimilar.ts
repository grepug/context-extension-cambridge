import * as cheerio from "cheerio";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import { randomId } from "./utils";
// 页面根元素
type DOMNode = cheerio.Cheerio<cheerio.Element>;

export class CambridgeSimilar {
  $: cheerio.CheerioAPI;
  domEntry: DOMNode;
  baseURL: string =
    "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/";
  constructor(props: { html: string }) {
    this.$ = cheerio.load(props.html);
    this.domEntry = this.$(".hfl-s");
  }
  // 获取词条列表
  getEntryItems() {
    console.log('dsdadada');
    const entryItems = this.$(".lbt.lp-5.lpl-20")
      .map((index, el) => {
        const $el = this.$(el);
        const title = $el.find("a").text();
        const url = $el.find("a").attr("href");
        console.log(url, "url");
        return {
          id: randomId(),
          title,
          url,
          description: "dasdasjdas",
          imageSource: { base64: { value: "dasdasd" } },
        };
      })
      .toArray();
    return entryItems;
  }
}
