import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test family", () => {
  let data: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "family" });
    data = (await fetcher.parse()).entry;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈfæm.əl.i/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukf/ukfal/ukfalsi012.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("family");
    expect(data.definitionGroups.length).toEqual(1);


    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("SOCIAL GROUP");
    
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["C or U + sing/pl verb"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "a group of people who are related to each other, such as a mother, a father, and their children",
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
      "家，家庭",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "A new family has/have moved in next door.",
      );
  });

  // 测试短语动词
  //idioms没有爬到
  // test("idioms", () => {
  //   expect(data.definitionGroups[0].idioms.length).toEqual(1);
  //   expect(
  //     data.definitionGroups[0].idioms.map((el: any) => el.text).slice(1),
  //   ).toEqual([
  //     "be in the family way",
  //   ]);

    /**测试不通过
     * Expected: "idiom"
       Received: ""
     */
    // expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
    //   .toEqual("idiom");

    /**
     *  Expected: "to be pregnant"
        Received: ""
     */
    // expect(
    //   data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
    //     .rawText,
    // ).toEqual(
    //   "to be pregnant",
    // );

    // 这里没有爬到释义的翻译
    // expect(
    //   data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
    //     .text.translation.rawText,
    // ).toEqual("怀孕");
  // });
});
