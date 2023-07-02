import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test for", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "for" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);
    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("strong /fɔːr/,weak /fər/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukf/ukfoo/ukfootf026.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("for");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("preposition");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("conjunction");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(17);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "INTENDED FOR",
    );
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "intended to be given to",
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
      "（表示给予的对象）给",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "There's a phone message for you.",
      );
  });

    // 无短语动词


    test("idioms", () => {
      expect(data.definitionGroups[0].idioms.length).toEqual(3);
      expect(
        data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
      ).toEqual([
        "for all sb cares/knows",
        "that/there's ... for you",
        "what ... for?",
      ]);
  
    });
});
