import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test house", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "house" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(4);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/haʊs/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukh/ukhot/ukhotfo023.mp3");

    });
    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(8);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("HOME");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["C"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(3);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "a building that people, usually one family, live in",
        );

        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("house");
        expect(data.definitionGroups.length).toEqual(2);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
    });


    //测试关联词
    test("associated word", () => {

        expect(data.definitionGroups[0].senses[0].relatedEntries[0]).toEqual("farmhouse noun");
        expect(data.definitionGroups[0].senses[0].relatedEntries.length).toEqual(2);

    });


    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(5);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-1),
        ).toEqual([
            "on the house",
        ]);
      
        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
          .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "If two people get on like a house on fire, they like each other very much and become friends very quickly.",
        );

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("一见如故，情投意合");
    });


});
