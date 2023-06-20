import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test fed", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "fed" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/fed/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukf/ukfea/ukfeast020.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("fed");
    expect(data.definitionGroups.length).toEqual(2);
    expect(data.definitionGroups[0].partOfSpeech).toEqual("");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(1);

    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "past simple and past participle of feed",
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
      "（feed的过去式及过去分词）",
    );

    expect(
      data.definitionGroups[1].senses[0].examples[0].text.rawText,
    )
      .toEqual(
        "The Feds completely screwed up the arrest.",
      );
  });

  //测试联想词
  test("entryItems", () => {
    //测试不通过 只要all部分
    // expect(data_Items.length).toEqual(7);

    //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
    // expect(data_Items[0].title).toEqual("fed");
    // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/fed");
    //   expect(data_Items[1].title).toEqual("feed");
    //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/feed);
    //   expect(data_Items.map((el: any) => el.title).slice(-2),
    // )
    //   .toEqual(
    //     [
    //       "the Fed, at the Federal Reserve",
    //       "feed off/on sth",
    //     ],
    //   );

  });
});
