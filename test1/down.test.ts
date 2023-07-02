import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test down", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "down" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("/daʊn/");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukd/ukdou/ukdoubl024.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("down");
    expect(data.definitionGroups.length).toEqual(6);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("adverb");
    expect(data.definitionGroups[1].partOfSpeech).toEqual("preposition");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("verb");
    expect(data.definitionGroups[3].partOfSpeech).toEqual("adjective");
    expect(data.definitionGroups[4].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[5].partOfSpeech).toEqual("prefix");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(8);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
      "LOWER POSITION",
    );
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(3);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "in or towards a low or lower position, from a higher one",
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
      "在下面;向下，朝下",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Is this lift going down?",
      );
  });

  //没有短语动词

  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(8);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "down sb's way",
      "down under",
      "(right) down to",
      "down with...!",
      "one, two, etc. down, one, two etc. to go.",
    ]);

  });
});
