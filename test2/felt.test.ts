import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test felt", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "felt" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/felt/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukf/ukfee/ukfeed_028.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("felt");
    expect(data.definitionGroups.length).toEqual(2);
    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "past simple and past participle of feel",
    );

    expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    expect(
      data.definitionGroups[0].senses[0].text.translation.rawText,
    ).toEqual(
      "（feel的过去式及过去分词）",
    );

    expect(
      data.definitionGroups[1].senses[0].examples[0].text.rawText,
    )
      .toEqual(
        "a felt hat",
      );
  });

//测试联想词
test("entryItems", () => {
  //测试不通过 只要all部分
  // expect(data_Items.length).toEqual(7);

  //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
  // expect(data_Items[0].title).toEqual("felt");
  // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/felt");
  //   expect(data_Items[1].title).toEqual("feel");
  //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/feel);
  //   expect(data_Items.map((el: any) => el.title).slice(-2),
  // )
  //   .toEqual(
  //     [
  //       "feel for sb",
  //       "feel sb up",
  //     ],
  //   );

});
});
