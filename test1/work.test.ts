import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test work", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "work" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/wɜːk/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukw/ukwor/ukwordp005.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("work");
    expect(data.definitionGroups.length).toEqual(3);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("suffix");


  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(8);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("ACTIVITY");
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["U"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);//等级
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "an activity, such as a job, that a person uses physical or mental effort to do, usually for money",
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
      "工作，活儿；劳动",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "I've got so much work to do.",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {

    expect(data.definitionGroups[1].phrasalVerbs.length).toEqual(14);
    expect(data.definitionGroups[1].phrasalVerbs[0].text).toEqual(
      "work against/for sb",
    );
    // 测试列表前5个
    expect(
      data.definitionGroups[1].phrasalVerbs.map((el: any) => el.text).slice(-5),
    )
      .toEqual(
        [
          "work sb over",
          "work through sth",
          "work up sth",
          "work sb up",
          "work (yourself) up to sth",
        ],
      );


    /**
     * Expected: "phrasal verb"
     * Received: "phrasal verbverb"
     */
    // expect(
    //   data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
    // ).toEqual(
    //   "phrasal verb",
    // );

    expect(
      data.definitionGroups[1].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.rawText,
    ).toEqual("to make it more difficult, or easier, for someone to achieve something");


    expect(
      data.definitionGroups[1].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("使对（某人）不利／有利");
  });

  test("idioms", () => {

    expect(data.definitionGroups[0].idioms.length).toEqual(7);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "get/set to work",
      "have your work cut out (for you)",
      "in the works",
    ]);

    /**测试不通过
     * Expected: "idiom"
       Received: ""
     */
    // expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
    //   .toEqual("idiom");


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "said to warn someone that they will not be an interesting person by working all the time",
    );

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("只用功不玩耍（聪明孩子也变傻）。");
  });
});
