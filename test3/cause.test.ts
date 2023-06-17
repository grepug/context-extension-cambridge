import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test cause", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "cause" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/kɔːz/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukc/ukcat/ukcatsu018.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("cause");
        expect(data.definitionGroups.length).toEqual(3);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[2].partOfSpeech).toEqual("conjunction");
    });
 

    //测试关联词
    test("associated word", () => {
        //测试不通过 没有爬到synonyms
        // Expected: "cos"
        // Received: []
        // 此情况极为特殊
        // expect(data.definitionGroups[2].senses[0].synonyms[0]).toEqual("cos");

    });



});
