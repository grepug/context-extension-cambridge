import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test blow", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "blow" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/bləʊ/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukb/ukblo/ukblood028.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("blow");
        expect(data.definitionGroups.length).toEqual(2);
        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");

    });

    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(3);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("SEND OUT AIR");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraitLabels).toEqual(["I or T"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(5);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "to move and make currents of air, or to be moved or make something move on a current of air",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "吹;吹动;被吹走",
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
                "The wind was blowing harder every minute.",
            );
    });

    // 测试短语动词

    test("phrasal verbs", () => {

        expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(9);
        expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
            "blow sb away",
        );
        // 测试列表前5个
        expect(
            data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
                0,
                5,
            ),
        )
            .toEqual(
                [
                    "blow sb away",
                    "blow sb/sth away",
                    "blow sth/sb off",
                    "blow (sth) out",
                    "blow sb out",
                ],
            );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].partOfSpeech,
        ).toEqual(
            "phrasal verb",
        );


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0].children[0]
                .text.rawText,
        ).toEqual("to surprise or please someone very much");


        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0].children[0]
                .text.translation.rawText,
        ).toEqual("使…大为惊讶;令…非常高兴");
    });

    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(15);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-3),
        ).toEqual([
            "blow the gaff",
            "blow the whistle on sb/sth",
            "I'll be blowed!",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
            .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "If someone says that they are blowed if they will do something, they are determined not to do it.",
        );


        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("决不会…");
    });
    //测试词条描述
    test("desc", () => {

        expect(
            data.definitionGroups[0].desc,
        )
            .toEqual(
                "blew | blown",
            );
    });
});
