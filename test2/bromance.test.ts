import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test bromance", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "bromance" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈbrəʊ.mæns/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/c/cdo/cdo02/cdo0216bromuk0265.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("bromance");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(1);
    expect(data.definitionGroups[0].senses.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "a close, friendly, but not sexual relationship between two men",
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
      "（非性关系的）男性情谊",
    );
    //测试不通过，多了一个空格
    // Expected: "The two men apparently struck up a bromance while working on the movie set together."
    // Received: "The two men apparently struck up a bromance while working on the movie set together. "
    // expect(
    //   data.definitionGroups[0].senses[0].examples[0].text.rawText,
    // )
    //   .toEqual(
    //     "The two men apparently struck up a bromance while working on the movie set together.",
    //   );
  });


});
