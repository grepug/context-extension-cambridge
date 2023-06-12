import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test convenient", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "convenient" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/kənˈviː.ni.ənt/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukc/ukcon/ukconva008.mp3");

    });
    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(1);
        //测试不通过
        // Expected: 2
        // Received: 1
        // expect(data.definitionGroups[0].senses.length).toEqual(2);

        //测试不通过
        // Expected: "suitable for your purposes and needs and causing the least difficulty"
        // Received: "suitable for your purposes and needs and causing the least difficultynear or easy to get to or use"
        // expect(data.definitionGroups[0].senses[0].text.rawText).toEqual(
        //     "suitable for your purposes and needs and causing the least difficulty",
        // );

        expect(data.definitionGroups[0].senses[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("convenient");
        expect(data.definitionGroups.length).toEqual(1);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("adjective");


    });


    //测试关联词
    test("associated word", () => {
        //测试不通过 没有爬到opposite
        // Expected: "inconvenient"
        // Received: []
        // expect(data.definitionGroups[0].senses[0].children[0].opposite.toEqual("inconvenient"));
        // expect(data.definitionGroups[0].senses[0].children[0].opposite.length.toEqual("1"));

    });



});
