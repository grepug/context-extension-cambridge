import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test found", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "found" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/faʊnd/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukf/ukfor/ukfortn023.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("found");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(4);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("FIND");

    expect(data.definitionGroups[0].senses[1].children[0].grammarTraitLabels).toEqual(["T"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "past simple and past participle of find",
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
      "（find的过去式及过去分词）",
    );

    expect(
      data.definitionGroups[0].senses[1].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "Boston was founded in 1630 by Puritan colonists from England.",
      );
  });

//测试联想词
test("entryItems", () => {

  expect(data_Items.length).toEqual(6);

  expect(data_Items[0].title).toEqual("found");
  expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/found");
    expect(data_Items[1].title).toEqual("find (sth) out");
    expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/find-sth-out");
    expect(data_Items.map((el: any) => el.title).slice(-2),
  )
    .toEqual(
      [
        "not anywhere to be found",
        "tried and found wanting",
      ],
    );

});

});
