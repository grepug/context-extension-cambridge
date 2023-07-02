import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test possibility", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "possibility" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˌpɒs.əˈbɪl.ə.ti/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/e/epd/epd32/epd32708.mp3");

    });
    // 测试释义
    test("senses", () => {

        expect(data.definitionGroups[0].senses.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].grammarTraitLabels).toEqual(["C or U"]);
        
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
            "a chance that something may happen or be true",
        );

        expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("possibility");
        expect(data.definitionGroups.length).toEqual(1);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");


    });


    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].opposites[0]).toEqual("impossibility (impossible)");
        expect(data.definitionGroups[0].senses[0].opposites.length).toEqual(1);

    });



});
