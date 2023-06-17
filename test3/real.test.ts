import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test real", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "real" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/rɪəl/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukr/ukrea/ukreadi011.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("real");
        expect(data.definitionGroups.length).toEqual(2);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("adjective");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("adverb");
    });
    // 测试蓝色部分
    test("senses", () => {
        //测试不通过，蓝色部分缺少real earnings, income, etc.（）
        // Expected: "real earnings, income, etc."
        // Received: "the value of earnings, etc. after the effect of rising prices is considered"
        expect(data.definitionGroups[0].senses[0].children[1].text.rawText).toEqual("real earnings, income, etc.");

        //测试不通过，children[1]是没有examples的
        // Expected: 0
        // Received: 1
        expect(data.definitionGroups[0].senses[0].children[1].examples.length).toEqual(0);

        //测试不通过，children[1]下少了一层，应该还有一层children
        expect(data.definitionGroups[0].senses[0].children[1].children[0].text.rawText).toEqual("the value of earnings, etc. after the effect of rising prices is considered");
        expect(data.definitionGroups[0].senses[0].children[1].children[0].examples[0].text.rawText).toEqual("Wages rose by 2.9 percent last year, but real earnings still fell by 1.3 percent.");


    });

    //测试关联词
    test("associated word", () => {
        //测试不通过 没有爬到relatedEntries
        // Expected: "real-world"
        // Received: []
        expect(data.definitionGroups[0].senses[0].children[3].relatedEntries[0]).toEqual("real-world")

    });


    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(2);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-2),
        ).toEqual([
            "get real!",
            "is he/she for real?",
        ]);

        /**测试不通过
         * Expected: "idiom"
           Received: ""
         */
        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
          .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "used for telling someone that they should try to understand the true facts of a situation and not hope for what is impossible",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("现实一点！清醒清醒吧！");
    });
});
