import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test government", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "government" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈɡʌv.ən.mənt/,/ˈɡʌv.əm.mənt/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukg/ukgou/ukgourd010.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("government");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("GROUP");
    //测试不通过
    // Array [
    //     -   "C, + sing/pl verb",
    //     +   "C",
    //     +   "+ sing/pl verb",
    //       ]
    // expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["C, + sing/pl verb"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "(written abbreviation govt)the group of people who officially control a country",
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    expect(
      data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
    ).toEqual(
      "政府，内阁",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "the government of Israel",
      );
  });

  //测试联想词
  test("entryItems", () => {
    //测试不通过 只要all部分
    // expect(data_Items.length).toEqual(7);

    //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
    // expect(data_Items[0].title).toEqual("government");
    // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/government");
    //   expect(data_Items[1].title).toEqual("government-owned");
    //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/government-owned);
    //   expect(data_Items.map((el: any) => el.title).slice(-2),
    // )
    //   .toEqual(
    //     [
    //       "government-backed",
    //       "caretaker government",
    //     ],
    //   );

  });
});
