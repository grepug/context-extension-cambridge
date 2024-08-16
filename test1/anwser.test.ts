import { CambridgeFetcher } from "../src/CambridgeFetcher.ts";

Deno.test("test answer", () => {
  let data: any;
  let data_Items: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "answer" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual(
      "/ˈɑːn.sər/"
    );
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual(
      "https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/uka/ukano/ukanore006.mp3"
    );
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

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1); //等级
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "a reaction to a question, letter, phone call, etc."
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en"
    );
  });

  // 测试例句
  test("examples", () => {
    expect(
      data.definitionGroups[0].senses[0].children[0].text.translation.rawText
    ).toEqual("回答;作答;答应;答复;答案");

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText
    ).toEqual(
      "The minister promised to give a written answer to the MP's detailed question."
    );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    expect(data.definitionGroups[1].phrasalVerbs.length).toEqual(5);
    expect(data.definitionGroups[1].phrasalVerbs[0].text).toEqual(
      "answer (sb) back"
    );

    // 测试列表前5个
    expect(
      data.definitionGroups[1].phrasalVerbs
        .map((el: any) => el.text)
        .slice(0, 5)
    ).toEqual([
      "answer (sb) back",
      "answer back",
      "answer for sth",
      "answer for sb/sth",
      "answer back",
    ]);

    expect(
      data.definitionGroups[1].phrasalVerbs[0].definitionGroups[0].partOfSpeech
    ).toEqual("phrasal verb");

    expect(
      data.definitionGroups[1].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.rawText
    ).toEqual("to speak rudely when answering someone in authority");

    expect(
      data.definitionGroups[1].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText
    ).toEqual("（跟某人）回嘴，顶嘴");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(1);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-1)
    ).toEqual(["sb's answer back/sth"]);

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech
    ).toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText
    ).toEqual(
      "If something or someone is the answer to another thing or person, it is or they are considered to be similar or as good."
    );

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .translation.rawText
    ).toEqual("与…相当（或同样好）的人（或物）;…的对应物");
  });

  //测试联想词
  test("entryItems", () => {
    expect(data_Items.length).toEqual(8);
    expect(data_Items[0].title).toEqual("answer");
    expect(data_Items[0].url).toEqual(
      "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/answer"
    );
    expect(data_Items[1].title).toEqual("answer back");
    expect(data_Items[1].url).toEqual(
      "https://dictionary.cambridge.org/dictionary/english-chinese-simplified/answer-back"
    );
    expect(data_Items.map((el: any) => el.title).slice(-1)).toEqual([
      "will not take no for an answer",
    ]);
  });
});
