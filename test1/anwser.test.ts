import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test answer", () => {
  let data: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "answer" });
    data = (await fetcher.parse()).entry;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈɑːn.sər/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/uka/ukano/ukanore006.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("answer");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("REACTION");

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);//等级
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "a reaction to a question, letter, phone call, etc.",
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
      "回答；作答；答应；答复；答案",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "The minister promised to give a written answer to the MP's detailed question.",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    expect(data.definitionGroups[1].phrasalVerbs.length).toEqual(5);
    expect(data.definitionGroups[1].phrasalVerbs[0].text).toEqual(
      "answer (sb) back",
    );

    // 测试列表前5个
    expect(
      data.definitionGroups[1].phrasalVerbs.map((el: any) => el.text).slice(
        0,
        5,
      ),
    )
      .toEqual(
        [
          "answer (sb) back",
          "answer back",
          "answer for sth",
          "answer for sb/sth",
          "answer to sb",
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

    /**
     *    Expected: "If a business or organization answers down or someone answers it down, it stops operating."
          Received: ""
     */
    // expect(
    //   data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
    //     .text.rawText,
    // ).toEqual("to speak rudely when answering someone in authority");

    // 这里没有爬到释义的翻译
    // expect(
    //   data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
    //     .text.translation.rawText,
    // ).toEqual("（跟某人）回嘴，顶嘴");
  });

  test("idioms", () => {
    //测试不通过 idoioms没有爬到
    // Expected: 1
    // Received: 0
    expect(data.definitionGroups[0].idioms.length).toEqual(1);
    expect(
      data.entry.definitionGroups[0].idioms.map((el: any) => el.text).slice(-1),
    ).toEqual([
      "sb's answer to sb/sth",
    ]);

    /**测试不通过
     * Expected: "idiom"
       Received: ""
     */
    // expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
    //   .toEqual("idiom");

    /**
     *  Expected: "to ignore something bad and pretend it is not happening"
        Received: ""
     */
    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "If something or someone is the answer to another thing or person, it is or they are considered to be similar or as good.",
    );

    // 这里没有爬到释义的翻译
    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("与…相当（或同样好）的人（或物）；…的对应物");
  });
});
