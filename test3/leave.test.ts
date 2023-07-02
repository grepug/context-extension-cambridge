import { CambridgeFetcher } from "../src/CambridgeFetcher";



describe("test leave", () => {
  let data: any;
  let data_Items: any;

  beforeAll(async () => {
    let fetcher = new CambridgeFetcher({ entry: "leave" });
    data = (await fetcher.parse()).entry;
    data_Items = (await fetcher.parse()).entryItems;
  });

  //测试音标
  test("test pronunciations", () => {
      expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

      expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
      expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/liːv/");
      expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukl/uklea/uklearn013.mp3");

  });
// 测试释义组
  test("test definitionGroup", () => {
      expect(data.text).toEqual("leave");
      expect(data.definitionGroups.length).toEqual(2);

      expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
      expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
  });

    // 测试释义组
    test("test definitionGroup", () => {
      expect(data.text).toEqual("leave");
      expect(data.definitionGroups.length).toEqual(2);
  
      expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
      expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
    });
  
    // 测试释义
    test("senses", () => {
      expect(data.definitionGroups[0].senses.length).toEqual(9);
      expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("GO AWAY");
      
      expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I or T"]);
      expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
      expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
        "to go away from someone or something, for a short time or permanently",
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
        "离开;离去;走开",
      );
  
      expect(
        data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
      )
        .toEqual(
          "I'll be leaving at five o'clock tomorrow.",
        );
    });
  
    // 测试短语动词
    test("phrasal verbs", () => {
      expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(8);
      expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
        "leave sth aside",
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
            "leave sth aside",
            "leave sth/sb behind",
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
      ).toEqual("to not discuss one subject so that you can discuss a different subject");
  
  
      expect(
        data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
          .text.translation.rawText,
      ).toEqual("将（话题等）搁置，将…放在一边");
    });
  
    test("idioms", () => {
      expect(data.definitionGroups[0].idioms.length).toEqual(15);
      expect(
        data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-2),
      ).toEqual([
        "leave no stone unturned",
        "leave well alone",
      ]);
      
      expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
        .toEqual("idiom");
  
      expect(
        data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
          .rawText,
      ).toEqual(
        "to suddenly have to deal with a difficult situation because others have decided that they do not want the responsibility",
      );
  
  
      expect(
        data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
          .text.translation.rawText,
      ).toEqual("被迫独立撑起局面，不得不承担起（别人丢下的）责任");
    });
  
     //测试联想词
     test("entryItems", () => {
  
      expect(data_Items.length).toEqual(15);
  
      expect(data_Items[0].title).toEqual("leave");
      expect(data_Items[0].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/leave");
      expect(data_Items[1].title).toEqual("leave off!");
      expect(data_Items[1].url).toEqual("https://dictionary.cambridge.org/dictionary/english-chinese-simplified/leave-off");
      expect(data_Items.map((el: any) => el.title).slice(-2),
    )
      .toEqual(
        [
          "leave sb out in the col",
          "leave sb standing",
        ],
      );
    
    });
});
