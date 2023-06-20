import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test desktop", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "desktop" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });

    //测试音标
    test("test pronunciations", () => {
        expect(data.definitionGroups[0].pronunciations.length).toEqual(2);

        expect(data.definitionGroups[0].pronunciations[0].geoKind).toEqual("uk");
        expect(data.definitionGroups[0].pronunciations[0].phoneticAlphabet).toEqual("/ˈdesk.tɒp/");
        expect(data.definitionGroups[0].pronunciations[0].url).toEqual("/media/english-chinese-simplified/uk_pron/u/ukd/ukdes/ukdesir007.mp3");

    });
    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].text.rawText).toEqual("COMPUTING");
        expect(data.definitionGroups[0].senses[0].children[0].grammarTraits).toEqual(["C"]);

        expect(data.definitionGroups[0].senses[0].children.length).toEqual(2);
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "a view on a computer screen that contains icons (= small symbols or pictures) representing files, programs, and other features of the computer",
        );

        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en")
    });
    // 测试释义组
    test("test definitionGroup", () => {
        expect(data.text).toEqual("desktop");
        expect(data.definitionGroups.length).toEqual(1);

        expect(data.definitionGroups[0].partOfSpeech).toEqual("noun");
    });


    //测试关联词
    test("associated word", () => {
        expect(data.definitionGroups[0].senses[0].children[1].relatedEntries[0]).toEqual("laptop");
        expect(data.definitionGroups[0].senses[0].children[1].relatedEntries.length).toEqual(3);

        expect(data.definitionGroups[0].senses[0].relatedEntries[0]).toEqual("laptop");
        expect(data.definitionGroups[0].senses[0].relatedEntries.length).toEqual(3);

    });

});
