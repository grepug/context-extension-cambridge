import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test meet", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "meet" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/miːt/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("https://dictionary.cambridge.org/media/english-chinese-simplified/uk_pron/u/ukm/ukmea/ukmeant012.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("meet");
        expect(data.definitionGroups.length).toEqual(2);
        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");

    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(6);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("FOR THE FIRST TIME");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["T or I"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to see and talk to someone for the first time",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "（和…）初次见面;（与…）相识",
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
                "They met at work.",
            );
    });

    // 测试短语动词
    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(7);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
        ).toEqual([
            "meet your maker",
            "meet your match",
            "meet your Waterloo",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "If there is more to something than meets the eye, it is more difficult to understand or involves more things than you thought at the beginning.",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("不像表面那么简单，比表面看到的要复杂");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "met | met",
            );
    });
});
