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
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukr/ukrea/ukreadi011.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("real");
        expect(data.definitionGroups.length).toEqual(3);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("adjective");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("adverb");
        expect(data.definitionGroups[2].partOfSpeech).toEqual("noun");
    });
    // 测试蓝色部分
    test("senses", () => {

        expect(data.definitionGroups[0].senses[0].children[1].text.rawText).toEqual("real earnings, income, etc.");

        expect(data.definitionGroups[0].senses[0].children[1].examples.length).toEqual(0);

        expect(data.definitionGroups[0].senses[0].children[1].children[0].text.rawText).toEqual("the value of earnings, etc. after the effect of rising prices is considered");
        expect(data.definitionGroups[0].senses[0].children[1].children[0].examples[0].text.rawText).toEqual("Wages rose by 2.9 percent last year, but real earnings still fell by 1.3 percent.");


    });

    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].children[3].relatedEntries[0]).toEqual("real-world");
    });


    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(2);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-2),
        ).toEqual([
            "get real!",
            "is he/she for real?",
        ]);

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
