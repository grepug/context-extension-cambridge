import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test time", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "time" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

    //测试音标
    test("test pronunciations", () => {
      expect(data.definitionGroups[0].pronunciations.length).toEqual(2);
      expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
      expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/taɪm/");
      expect(data.definitionGroups[1].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukt/ukthu/ukthund015.mp3");
  
    });

  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("time");
    expect(data.definitionGroups.length).toEqual(3);
    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("suffix");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(12);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "MINUTES/DAYS/YEARS",
    );
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["U"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(6);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "the part of existence that is measured in minutes, days, years, etc., or this process considered as a whole",
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
      "时间",
    );
    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "He wants to spend more time with his family.",
      );
  });

  // 无短语动词


  test("idioms", () => {

    expect(data.definitionGroups[0].idioms.length).toEqual(24);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "the time of your life",
      "have time on your hands",
      "time stands still",
      "(only) time will tell",
      "time's a great healer",
    ]);

  });
});
