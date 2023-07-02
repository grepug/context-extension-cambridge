import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test person", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "person" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈpɜː.sən/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukp/ukper/ukperpe023.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("person");
    expect(data.definitionGroups.length).toEqual(2);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("suffix");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("HUMAN");
    

    expect(data.definitionGroups[0].senses[0].children.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "a man, woman, or child",
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
      "人",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Who was the first person to swim the English Channel?",
      );
  });



  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(2);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-2),
    ).toEqual([
      "in the person of sb",
      "on/about your person",
    ]);

    expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
      .toEqual("idiom");

    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
        .rawText,
    ).toEqual(
      "in the form of someone",
    );


    expect(
      data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
        .text.translation.rawText,
    ).toEqual("通过（某人）体现；以（某人）的身份");
  });
  
   //测试联想词
   test("entryItems", () => {

    expect(data_Items.length).toEqual(8);


    expect(data_Items[0].title).toEqual("person");
    expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/person");
      expect(data_Items[1].title).toEqual("in the person of sb");
      expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/in-the-person-of-sb");
      expect(data_Items.map((el: any) => el.title).slice(-2),
    )
      .toEqual(
        [
          "there's no such thing/person (as)",
          "for a man/woman/person of his/her years",
        ],
      );

  });
});
