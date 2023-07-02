import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test like", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "like" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/laɪk/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukl/uklif/uklifes017.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("like");
    expect(data.definitionGroups.length).toEqual(7);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("preposition,conjunction");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("preposition");
    expect(data.definitionGroups[3].partOfSpeech).toEqual("adverb");
    expect(data.definitionGroups[4].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[5].partOfSpeech).toEqual("adjective");
    expect(data.definitionGroups[6].partOfSpeech).toEqual("suffix");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("ENJOY");
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to enjoy or approve of something or someone",
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
      "喜欢，喜爱",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "I like your new haircut.",
      );
  });

   // 无短语动词


  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(7);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "I'd like to see...",
      "if you like",
      "like it or lump it",
      "what's not to like?",
      "would you like...?",
    ]);

    
  });
});
