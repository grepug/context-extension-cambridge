import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test bring", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "bring" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/brɪŋ/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukb/ukbri/ukbriga019.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("bring");
        expect(data.definitionGroups.length).toEqual(1);
        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");


    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(3);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("TOWARDS PLACE");

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to take or carry someone or something to a place or a person, or in the direction of the person speaking",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "拿来，带来；带到",
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
                '"Shall I bring anything to the party?" "Oh, just a bottle."',
            );
    });

    // 测试短语动词

    test("phrasal verbs", () => {

        expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(20);
        expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
            "bring sth about",
        );
        // 测试列表前5个
        expect(
            data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
                -5,
            ),
        )
            .toEqual(
                [
                    "bring sb round",
                    "bring sb to",
                    "bring sb/sth together",
                    "bring sb up",
                    "bring sth up",
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
        ).toEqual("to cause something to happen");


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("引起；导致");
    });

    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(6);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
        ).toEqual([
            "bring the house down",
            "bring up the rear",
            "not bring yourself to do something",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "to punish someone and make that person explain their behaviour",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("惩罚（某人）并要求其作出解释");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "brought | brought",
            );
    });
});
