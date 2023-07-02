import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test entrance", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "entrance" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈen.trəns/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/uke/ukent/ukentic016.mp3");

    });
    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses[0].grammarTraitLabels).toEqual(["C"]);

        expect(data.definitionGroups[0].senses.length).toEqual(4);

      
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
            "a door, gate, etc. by which you can enter a building or place",
        );

        expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("entrance");
        expect(data.definitionGroups.length).toEqual(2);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
    });


    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].relatedEntries[0]).toEqual("exit noun (DOOR)");
        expect(data.definitionGroups[0].senses[0].relatedEntries.length).toEqual(1);

    });

});
