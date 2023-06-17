import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test take", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "take" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/teɪk/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukt/uktaj/uktajik002.mp3");

    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("take");
        expect(data.definitionGroups.length).toEqual(2);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("verb");
        expect(data.definitionGroups[1].partOfSpeech).toEqual("noun");

    });


    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].children[1].relatedEntries[0]).toEqual("take sth away (CALCULATE)");

    });

    // 测试短语动词
    test("phrasal verbs", () => {
        expect(data.definitionGroups[0].phrasalVerbs.length).toEqual(33);
        expect(data.definitionGroups[0].phrasalVerbs[0].text).toEqual(
            "take sb aback",
        );

        // 测试列表前5个
        expect(
            data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(
                0,
                3,
            ),
        )
            .toEqual(
                [
                    "take sb aback",
                    "take after sb",
                    "take against sb",
                ],
            );
        // 测试列表后5个
        expect(
            data.definitionGroups[0].phrasalVerbs.map((el: any) => el.text).slice(-3),
        )
            .toEqual(
                [
                    "take sth up",
                    "take sb up on sth",
                    "take up with sb",
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
        ).toEqual("to surprise or shock someone so much that they do not know how to behave for a short time");

        expect(
            data.definitionGroups[0].phrasalVerbs[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("使（某人）大吃一惊");
    });

    test("idioms", () => {
        expect(data.definitionGroups[0].idioms.length).toEqual(12);
        expect(
            data.definitionGroups[0].idioms.map((el: any) => el.text).slice(-1),
        ).toEqual([
            "will not take no for an answer",
        ]);

        expect(data.definitionGroups[0].idioms[0].definitionGroups[0].partOfSpeech)
          .toEqual("idiom");

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0].text
                .rawText,
        ).toEqual(
            "to be very easy",
        );

        expect(
            data.definitionGroups[0].idioms[0].definitionGroups[0].senses[0]
                .text.translation.rawText,
        ).toEqual("非常容易的");
    });


});
