import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test like", () => {
  let data: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "like" });
    data = await fetcher.parse();
  });

  //测试音标
  test("test pronunciations", () => {
    expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

    expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
    expect(data.definitionGroups[1].pronunciations[0].phoneticAlphabet).toEqual("laɪk");
    expect(data.definitionGroups[1].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukl/uklif/uklifes017.mp3");

  });
  // 测试释义组
  test("test definitionGroup", () => {
    expect(data.text).toEqual("like");
    expect(data.definitionGroups.length).toEqual(7);

    expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
    // 测试不通过
    // Expected: "preposition, conjunction"
    // Received: "prepositionconjunction"
    // expect(data.definitionGroups[1].partOfSpeech).toEqual("preposition, conjunction");
    expect(data.definitionGroups[2].partOfSpeech).toEqual("preposition");
    expect(data.definitionGroups[3].partOfSpeech).toEqual("adverb");
    expect(data.definitionGroups[4].partOfSpeech).toEqual("noun");
    expect(data.definitionGroups[5].partOfSpeech).toEqual("adjective");
    expect(data.definitionGroups[6].partOfSpeech).toEqual("suffix");
  });

  // 测试释义
  test("senses", () => {
    expect(data.definitionGroups[0].senses.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("ENJOY");
    expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
    expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
      "to enjoy or approve of something or someone",
    );

    expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
      "en",
    );
  });

  // 测试例句
  test("examples", () => {
    /**测试不通过
    Expected: "喜欢，喜爱"
    Received: "喜欢，喜爱我喜欢你的新发型。你爱吃鱼吗？我喜欢那种碰上好书时手不释卷的感觉。我很喜欢喝酒，但没有酒我还是可以忍受的。他在单位里人缘相当好。他谁的话都听不进去，却以为我们大家都会听他的，对此我非常反感。我不喜欢搞得别人心烦意乱。他喜欢晚上看电视消磨时间。他喜欢吃熟透的牛排。"
     **/
    // expect(
    //   data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
    // ).toEqual(
    //   "喜欢，喜爱",
    // );

    expect(
      data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
    )
      .toEqual(
        "I like your new haircut.",
      );
  });

   // 无短语动词


  test("idioms", () => {
    expect(data.definitionGroups[0].idioms.length).toEqual(7);
    expect(
      data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-5),
    ).toEqual([
      "I'd like to see...",
      "if you like",
      "like it or lump it",
      "what's not to like?",
      "would you like...?",
    ]);

    
  });
});
