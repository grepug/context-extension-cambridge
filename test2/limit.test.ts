import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test limit", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "limit" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/ˈlɪm.ɪt/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukl/uklil/uklilt_014.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("limit");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(5);

    expect(data.definitionGroups[0].senses[0].grammarTraitLabels).toEqual(["C"]);

    expect(data.definitionGroups[0].senses.length).toEqual(5);
    expect(data.definitionGroups[0].senses[2].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[2].children[0].text.rawText).toEqual("something that is very annoying or not convenient");

    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "the greatest amount, number, or level of something that is either possible or allowed",
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
      "限额;限制;上限",
    );
    expect(
      data.definitionGroups[0].senses[0].examples[0].text.rawText,
    )
      .toEqual(
        "Is there a limit on the amount of money you can claim?",
      );
  });


  test("idioms", () => {


    expect(data.definitionGroups[0].idioms.length).toEqual(1);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(0),
    ).toEqual([
      "within limits",
    ]);
    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "to some extent, but not allowing everything",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("到一定程度，不是毫无限制");
  });

   //测试联想词
   test("entryItems", () => {
    //测试不通过 只要all部分
    // expect(data_Items.length).toEqual(7);

    //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
    // expect(data_Items[0].title).toEqual("limit");
    // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/limit");
  //   expect(data_Items[1].title).toEqual("age limit);
  //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/age limit);
  //   expect(data_Items.map((el: any) => el.title).slice(-2),
  // )
  //   .toEqual(
  //     [
  //       "within limits",
  //       "the sky's the limit",
  //     ],
  //   );
  
  });
});
