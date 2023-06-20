import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test eat", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "eat" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");

    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/iːt/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/uke/ukeas/ukeasil014.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("eat");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");

  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(1);

    expect(data.definitionGroups[0].senses.length).toEqual(1);//等级
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "to put or take food into the mouth, chew it (= crush it with the teeth), and swallow it",
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
      "吃",
    );
    
    expect(
      data.definitionGroups[0].senses[0].examples[0].text.rawText,
    )
      .toEqual(
        "Do you eat meat?",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(7);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "eat away at sth",
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
      "eat away at sth",
      "eat away at sb",
      "eat in",
      "eat into sth",
      "eat out",
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
    ).toEqual("to gradually damage or destroy something");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("逐渐毁掉；侵蚀；损耗");
  });

  test("idioms", () => {
    
    expect(data.definitionGroups[0].idioms.length).toEqual(13);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "I'll eat my hat",
      "(I'm so hungry), I could eat a horse",
      "what's eating sb?",
    ]);


    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "If someone is eaten up with/by a negative emotion, they are experiencing it very strongly.",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("被（某种消极情绪）所折磨；内心充满（某种消极情绪）");
  });

  //测试词条描述
  test("desc", () => {

    expect(
        data.definitionGroups[0].desc,
    )
        .toEqual(
            "ate | eaten",
        );
});
});
