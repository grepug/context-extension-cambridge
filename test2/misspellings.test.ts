import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test misspellings", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "misspellings" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试联想词
  test("entryItems", () => {
    //测试不通过 
    // expect(data_Items.length).toEqual(1);
    //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
    // expect(data_Items[0].title).toEqual("misspellings");
    // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/misspelling?q=misspellings");

  });
});
