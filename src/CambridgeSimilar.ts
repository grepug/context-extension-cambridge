import * as cheerio from "cheerio";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import { randomId } from "./utils";
// 页面根元素
type DOMNode = cheerio.Cheerio<cheerio.Element>;

export class CambridgeSimilar {
  $: cheerio.CheerioAPI;
  constructor(props: { html: string }) {
    this.$ = cheerio.load(props.html);
  }
  // 获取词条列表
  getEntryItems():LookUpExtensionEntryItem[] {
    // 选择ul上面只有唯一类名.hul-u,然后找到li
    const li = this.$('p').filter((i, el) => this.$(el).text().startsWith("We have these words with similar spellings or pronunciations:")).next().find('li').toArray()
    const entryItems = li
      .map((el) => {
        const $el = this.$(el);
        const title = $el.find("a").text();
        const url = $el.find("a").attr("href");
        return {
          id: randomId(),
          title: title,
          url: url ? url : "",
          description: "",
          imageSource: { base64: { value: "" } },
        };
      })
    return entryItems;
  }
}
