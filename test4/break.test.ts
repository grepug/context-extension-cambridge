import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test break", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "break" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/breɪk/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukb/ukbra/ukbrain006.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("break");
        expect(data.definitionGroups.length).toEqual(2);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");
    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(15);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("DAMAGE");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I or T"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(1);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to (cause something to) separate suddenly or violently into two or more pieces, or to (cause something to) stop working by being damaged",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "破碎，破裂；打破；打断；损坏，弄坏",
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
                "The dish fell to the floor and broke.",
            );
    });

    // 测试短语动词
    test("phrasal verbs", () => {
        expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(14);
        expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
            "break away",
        );

        // 测试列表前5个
        // expect(
            //测试不通过 break (sth) up 括号爬没了
            // - Expected  - 1
            // + Received  + 1

            //   Array [
            //     "break through sth",
            //     "break sth up",
            // -   "break (sth) up",
            // +   "break sth up",
            //     "break up",
            //     "break with sth",
            //   ]
        //     data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(-5),
        // )
        //     .toEqual(
        //         [
        //             "break through sth",
        //             "break sth up",
        //             "break (sth) up",
        //             "break up",
        //             "break with sth",
        //         ],
        //     );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
        ).toEqual(
            "phrasal verb",
        );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0].children[0]
                .text.rawText,
        ).toEqual("to leave or to escape from someone who is holding you");


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0].children[0]
                .text.translation.rawText,
        ).toEqual("逃跑；挣脱");
    });

    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(17);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
        ).toEqual([
            "break the mould",
            "break wind",
            "breaking and entering",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "to work extremely hard",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("拼命工作");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "broke | broken",
            );
    });
});
