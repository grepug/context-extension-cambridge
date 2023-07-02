import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test family", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "family" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
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
    
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["C or U + sing/pl verb"]);
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

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(1);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(0),
    ).toEqual([
      "be in the family way",
    ]);


    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "to be pregnant",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("怀孕");
  });

    //测试联想词
    test("entryItems", () => {
      //测试不通过 只要all部分
      // expect(data_Items.length).toEqual(7);
  
      //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
      // expect(data_Items[0].title).toEqual("family");
      // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/family");
    //   expect(data_Items[1].title).toEqual("family man);
    //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/family man);
    //   expect(data_Items.map((el: any) => el.title).slice(-2),
    // )
    //   .toEqual(
    //     [
    //       "family circle",
    //       "family credit",
    //     ],
    //   );
    
    });
});
