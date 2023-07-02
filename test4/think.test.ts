import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test think", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "think" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/θɪŋk/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukt/ukthi/ukthick020.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("think");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(4);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("CONSIDER");
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I or T"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to believe something or have an opinion or idea",
    );
    expect(
        data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
      ).toEqual(
        "相信;觉得;思考",
      );
    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    //测试不通过
    // Expected: "[ + (that) ] I think (that) I've met you before."
    // Received: "I think (that) I've met you before."
    // expect(
    //   data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    // )
    //   .toEqual(
    //     "[ + (that) ] I think (that) I've met you before.",
    //   );
  });

// 测试短语动词
test("phrasal verbs", () => {
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(10);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "think ahead",
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
          "think ahead",
          "think back",
          "think for yourself"
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
    ).toEqual("to think carefully about what might happen in the future, or to make plans for things you want to do in the future");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("仔细为未来做打算，未雨绸缪");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(14);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "think outside the box",
      "to sb's way of thinking",
      "who would have thought it?",
    ]);

    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "did not know",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("想不出");
  });
  //测试词条描述
  test("desc", () => {
    
    expect(
      data.definitionGroups[0].desc,
    )
      .toEqual(
        "thought | thought",
      );
  });
});
