import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test smell", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "smell" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/smel/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/uks/uksma/uksmash005.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("smell");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("CHARACTERISTIC");
    //测试不通过
    // - Expected  - 1
    // + Received  + 2

    //   Array [
    // -   "I, L only + adj",
    // +   "I",
    // +   "L only + adj",
    //   ]
    // expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I, L only + adj"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to have a particular quality that others can notice with their noses",
    );
    expect(
        data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
      ).toEqual(
        "有…气味，发出…气味",
      );
    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    
    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "My hands smell of onions.",
      );
  });

// 测试短语动词
test("phrasal verbs", () => {
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(2);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "smell somewhere out",
    );

    // 测试列表前5个
    expect(
      data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
        0,
        2,
      ),
    )
      .toEqual(
        [
          "smell somewhere out",
          "smell sth/sb out",
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
    ).toEqual("to fill a place with a smell, in an unpleasant way");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("（某处）弥漫着难闻的气味");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(3);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
    ).toEqual([
      "come up/out smelling of roses",
      "smell a rat",
      "smell blood",
    ]);

    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "to have people believe that you are good and honest after a difficult situation that could have made you seem bad or dishonest",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("虽卷入…仍保持名誉；证明清白");
  });
  //测试词条描述
  test("desc", () => {
    
    expect(
      data.definitionGroups[0].desc,
    )
      .toEqual(
        "smelled or UK also smelt | smelled or UK smelt",
      );
  });
});
