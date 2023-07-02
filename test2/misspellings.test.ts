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

    expect(data_Items.length).toEqual(1);

    expect(data_Items[0].title).toEqual("misspelling");
    expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/misspelling?q=misspellings");

  });
});
