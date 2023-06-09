import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test discovery", () => {
  let data: any;
  let data_Items: any;
  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "discovery" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/dɪˈskʌv.ər.i/");
    expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukd/ukdis/ukdisco018.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("discovery");
    expect(data.definitionGroups.length).toEqual(1);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("FINDING");
    
    expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["C or U"]);
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "the process of finding information, a place, or an object, especially for the first time, or the thing that is found",
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
      "（尤指首次）发现（的过程）；被发现的事物",
    );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "the discovery of electricity",
      );
  });

});
