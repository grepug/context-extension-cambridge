import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test child", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "child" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/tʃaɪld/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukc/ukchi/ukchilb002.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("child");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");

  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "a boy or girl from the time of birth until he or she is an adult, or a son or daughter of any age",
    );
    expect(
      data.definitionGroups[0].senses[0].text.translation.rawText,
    ).toEqual(
      "儿童，小孩；儿子；女儿",
    );
    expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    
    expect(
      data.definitionGroups[0].senses[0].examples[0].text.rawText,
    )
      .toEqual(
        "an eight-year-old child",
      );
  });


  //测试词条描述
  test("desc", () => {
    
    expect(
      data.definitionGroups[0].desc,
    )
      .toEqual(
        "plural children",
      );
  });
});
