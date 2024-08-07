import * as cheerio from "cheerio";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem.ts";
import { randomId } from "./utils.ts";
import { Lang } from "./types/type.ts";
// 页面根元素
type DOMNode = cheerio.Cheerio<cheerio.Element>;

// 用来获取纠错的联想词
export class CambridgeSimilar {
  static qbaseURL: string =
    "https://dictionary.cambridge.org/spellcheck/english-chinese-simplified/?q=";

  $: cheerio.CheerioAPI;
  keyword: string;
  url: string;

  constructor(props: { keyword: string }) {
    this.keyword = props.keyword;
    this.url = CambridgeSimilar.qbaseURL + props.keyword;
    this.$ = cheerio.load("");
  }

  async parse(): Promise<LookUpExtensionEntryItem[]> {
    // 获取页面html
    let html = await this.fetch();
    this.$ = cheerio.load(html);

    return this.getEntryItems();
  }

  // 获取词条列表
  getEntryItems(): LookUpExtensionEntryItem[] {
    // 选择ul上面只有唯一类名.hul-u,然后找到li
    const li = this.$("p").filter((i, el) =>
      this.$(el).text().startsWith(
        "We have these words with similar spellings or pronunciations:",
      )
    ).next().find("li").toArray();

    const entryItems = li
      .map((el) => {
        const $el = this.$(el);
        const title = $el.find("a").text();
        const url = $el.find("a").attr("href");

        return {
          id: randomId(),
          title: title,
          url: url ? url : "",
          keyword: url?.split("/")[url.split("/").length - 1] || "",
          description: {
            id: randomId(),
            rawText: "",
            lang: Lang.en,
            translation: {
              id: randomId(),
              rawText: "",
              lang: Lang.zh,
            },
          },
        };
      });

    return entryItems;
  }

  async fetch(url?: string): Promise<string> {
    const link = url ?? this.url;

    const res = await fetch(link, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (res instanceof Response) {
      return res.text();
    }

    return res as any;
  }
}
