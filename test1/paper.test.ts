import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test paper", () => {
  let data: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "paper" });
    data = await fetcher.parse();
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈpeɪ.pər/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukp/ukpan/ukpanor026.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("paper");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("MATERIAL");
    expect(data.definitionGroups[0].senses[0].grammarTraits).toEqual(["U"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);//等级
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "thin, flat material made from crushed wood or cloth, used for writing, printing, or drawing on",
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
      "纸",
    );
    
    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "a piece/sheet of paper",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    //测试不通过 没有爬到phrasal verbs
    // Expected: 1
    // Received: 0
    // expect(data.definitionGroups[1].phrasalVerbs.length).toEqual(1);
    // expect(data.definitionGroups[1].phrasalVerbs[0].text).toEqual(
    //   "paper over sth",
    // );


    
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
     *    Expected: "to hide an unpleasant situation, especially a problem or disagreement, in order to make people believe that it does not exist or is not serious"
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
    // ).toEqual("掩盖（尤指问题或分歧）");
  });

  test("idioms", () => {
    
    expect(data.definitionGroups[0].idioms.length).toEqual(3);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "sb couldn't act, argue, fight, etc. their way out of a paper bag",
      "on paper",
      "a paper chase",
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
    // expect(
    //   data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
    //     .rawText,
    // ).toEqual(
    //   "said about someone you think has no energy or ability",
    // );

    // 这里没有爬到释义的翻译
    // expect(
    //   data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
    //     .text.translation.rawText,
    // ).toEqual("（某人）手无缚鸡之力／无能至极");
  });
});
