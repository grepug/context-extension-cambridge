import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test home", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "home" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

   //测试音标
   test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);
    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/həʊm/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukh/ukhol/ukholdu027.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("home");
    expect(data.definitionGroups.length).toEqual(3);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("adverb");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("adjective");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "HOUSE/APARTMENT",
    );
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual([
      "C or U",
    ]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(4);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "the house, apartment, etc. where you live, especially with your family",
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
      "家，住宅",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "The senator has two homes - an apartment in Washington and a house in Colorado.",
      );
  });

  // 无短语动词


  test("idioms", () => {

    expect(data.definitionGroups[0].idioms.length).toEqual(3);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "be/feel at home",
      "home from home",
      "make yourself at home",
    ]);

  });
});
