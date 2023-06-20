import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test buy", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "buy" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/baɪ/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukb/ukbut/ukbutte013.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("buy");
        expect(data.definitionGroups.length).toEqual(2);
        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");

    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("PAY FOR");

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to get something by paying money for it",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "买，购买",
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
                'Eventually she had saved enough money to buy a small car.',
            );
    });

    // 测试短语动词

    test("phrasal verbs", () => {

        expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(6);
        expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
            "buy sth in",
        );
        // 测试列表前5个
        expect(
            data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
                -3,
            ),
        )
            .toEqual(
                [
                    "buy sb out",
                    "buy yourself out",
                    "buy sth up",
                ],
            );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
        ).toEqual(
            "phrasal verb",
        );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
                .text.rawText,
        ).toEqual("to buy something for future use and not because you need it now");


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("提前大宗买进");
    });

    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(3);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
        ).toEqual([
            "buy the farm",
            "buy time",
            "sb has bought it",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "to die",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("死亡");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "bought | bought",
            );
    });
});
