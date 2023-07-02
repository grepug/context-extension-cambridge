import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test understand", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "understand" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˌʌn.dəˈstænd/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/uku/ukund/ukunder112.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("understand");
        expect(data.definitionGroups.length).toEqual(1);
        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");

    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("KNOW");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraits).toEqual(["I or T"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(5);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to know the meaning of something that someone says",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "理解;明白;懂得",
        );
        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en",
        );
    });

    // 测试例句
    test("examples", () => {

        expect(
            data.definitionGroups[0].senses[0].children[0].examples[0].text.rawText,
        )
            .toEqual(
                "She explained the whole idea again, but I still didn't understand.",
            );
    });

    // 测试短语动词
    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(1);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-1),
        ).toEqual([
            "make yourself understood",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "to communicate effectively",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("把自己的意思表达清楚");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "understood | understood",
            );
    });
});
