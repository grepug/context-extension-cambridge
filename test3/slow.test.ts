import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test slow", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "slow" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/sləʊ/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/uks/ukslo/ukslobb003.mp3");

    });
    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(4);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("NOT FAST");
        expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);

        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "moving, happening, or doing something without much speed",
        );

        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("slow");
        expect(data.definitionGroups.length).toEqual(3);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("adjective");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[2].partOfSpeech).toEqual("adverb");


    });


    //测试关联词
    test("associated word", () => {
        //测试不通过 没有爬到opposite
        // Expected: "fast (QUICK)"
        // Received: []
        expect(data.definitionGroups[0].senses[0].children[0].opposites[0]).toEqual("fast  (QUICK)");
        expect(data.definitionGroups[0].senses[0].children[0].opposites.length).toEqual(2);

    });



});
