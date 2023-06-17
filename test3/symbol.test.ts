import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test symbol", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "symbol" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈsɪm.bəl/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukc/ukcyb/ukcyber021.mp3");

    });
    // 测试释义
    test("senses", () => {
        // expect(data.definitionGroups[0].senses.length).toEqual(1);
        //测试不通过
        // Expected: 4
        // Received: 1
        expect(data.definitionGroups[0].senses.length).toEqual(4);

        //测试不通过
        // Expected: "a sign, shape, or object that is used to represent something else"
        // Received: "a sign, shape, or object that is used to represent something elsesomething that is used to represent a quality or ideaa number, letter, or sign used in mathematics, music, science, etc.An object can be described as a symbol of something else if it seems to represent it because it is connected with it in a lot of people's minds"
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
            "a sign, shape, or object that is used to represent something else",
        );

        expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("symbol");
        expect(data.definitionGroups.length).toEqual(1);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");

    });


    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].relatedEntries[0]).toEqual("emblem");
        expect(data.definitionGroups[0].senses[0].relatedEntries.length).toEqual(1);

    });

});
