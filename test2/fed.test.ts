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


});
