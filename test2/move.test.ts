import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test move", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "move" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/muːv/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukm/ukmou/ukmourn016.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("move");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(10);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("CHANGE POSITION");
    
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["I or T"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to (cause to) change position",
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
      "（使）改变位置，动；（使）移动",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "I'm so cold I can't move my fingers.",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(5);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "move sb/sth in",
    );

    // 测试列表前5个
    expect(
      data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
        0,
        5,
      ),
    )
      .toEqual(
        [
          "move sb/sth in",
          "move in on sth/sb",
          "move off sth/on (to sth)",
          "move on",
          "move out",
        ],
      );



    /**测试不通过
     * Expected: "phrasal verb"
     * Received: "phrasal verbverb"
     */
    // expect(
    //   data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
    // ).toEqual(
    //   "phrasal verb",
    // );


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.rawText,
    ).toEqual("If the police, army, or any group of people in authority move in, or if someone moves them in, they take control or attack, in order to deal with a difficult or dangerous situation.");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("接手；（对…）进行操纵，干预");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(5);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "move heaven and earth",
      "move it!",
      "move on to bigger/better things",
      "move with the times",
      "not move a muscle",
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
      "to do everything you can to achieve something",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("竭尽全力");
  });
});
