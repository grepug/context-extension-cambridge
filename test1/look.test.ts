import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test look", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "look" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/lʊk/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukl/uklon/uklonel018.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("look");
    expect(data.definitionGroups.length).toEqual(3);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("exclamation");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(6);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("SEE");
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I"]);

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to direct your eyes in order to see",
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
      "看，瞧，注视",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Look! There's grandma.",
      );
  });

  // 测试短语动词
  test("phrasal verbs", () => {
    expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(23);
    expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
      "look after sb/sth",
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
          "look after sb/sth",
          "look ahead",
          "look around (somewhere/sth)",
          "look at sth",
          "look back",
        ],
      );

    // 测试列表后5个
    expect(
      data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(-5),
    )
      .toEqual(
        [
          "look to sb for sth",
          "look up",
          "look sth up",
          "look sb up",
          "look up to sb",
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
    ).toEqual("to take care of or be in charge of someone or something");


    expect(
      data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("照看，照顾，看管");
  });

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(14);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "look straight/right through sb",
      "look to your laurels",
      "make sb look small",
      "never look a gift horse in the mouth",
      "never look back",
    ]);

    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "to be acting in a way that will certainly cause problems for you",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("招惹麻烦，自找麻烦");
  });
});
