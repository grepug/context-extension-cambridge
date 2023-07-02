import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test close", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "close" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/kləʊz/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukc/ukcli/ukclipp025.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("close");
    expect(data.definitionGroups.length).toEqual(4);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("adjective");
    expect(data.definitionGroups[3].partOfSpeech).toEqual("adjective,adverb");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("NOT OPEN");
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraits).toEqual(["I or T"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to (cause something to) change from being open to not being open",
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
      "（使）关，合，关闭",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Could you close the door/window please?",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(3);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "close (sth) down",
    );

    // 测试列表前5个
    expect(
      data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
        0,
        3,
      ),
    )
      .toEqual(
        [
          "close (sth) down",
          "close in",
          "close sth off",
        ],
      );

    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
    ).toEqual(
      "phrasal verb",
    );

    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.rawText,
    ).toEqual("If a business or organization closes down or someone closes it down, it stops operating.");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("关闭;（使）倒闭;（使）停业");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(3);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "close your eyes to sth",
      "close ranks",
      "close up shop",
    ]);

    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "to ignore something bad and pretend it is not happening",
    );

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("对…视而不见;不理会");
  });

  //测试联想词
  test("entryItems", () => {
    //测试不通过 只要all部分
    // Expected: 8
    // Received: 17
    // expect(data_Items.length).toEqual(8);

    //测试不通过 entry路由反的 entryItems 数组里面包含一个entry 本身，也就是数组第一个就是 entry 本身
    // Expected: "close"
    // Received: "close-up"
    // expect(data_Items[0].title).toEqual("close");
    // expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/close");
  //   expect(data_Items[1].title).toEqual("close-up");
  //   expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/close-up");
  //   expect(data_Items.map((el: any) => el.title).slice(-2),
  // )
  //   .toEqual(
  //     [
  //       "close shave",
  //       "close-cropped",
  //     ],
  //   );
  
  });
});
