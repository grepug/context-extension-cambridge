import { CambridgeFetcher } from "../src/CambridgeFetcher";

function makeArray(times: number) {
  var array: number[] = [];

  for (let i = 0; i < times; i++) {
    array.push(i);
  }

  return array;
}

describe.each(makeArray(50))("test leave", () => {
  let data: any;
  let data_Items: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "leave" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  // test("test pronunciations", () => {
  //     expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

  //     expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
  //     expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/kɔːz/");
  //     expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukc/ukcat/ukcatsu018.mp3");

  // });
  // // 测试释义组
  // test("test definitionGroup", () => {
  //     expect(data.text).toEqual("cause");
  //     expect(data.definitionGroups.length).toEqual(3);

  //     expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
  //     expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
  //     expect(data.definitionGroups[2].partOfSpeech).toEqual("conjunction");
  // });

  // //测试关联词
  // test("associated word", () => {

  //     expect(data.definitionGroups[2].senses[0].synonyms[0]).toEqual("cos");

  // });

  test("test idiom", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(15);
    expect(data.definitionGroups[0].idioms[4].text).toEqual(
      "leave sb in the lurch"
    );
  });
});
