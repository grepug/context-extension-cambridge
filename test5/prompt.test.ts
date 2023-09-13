import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test blow", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "prompt" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });


    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[2].senses[1].children[1].text.rawText).toEqual(
            "a person whose job is to help actors, during a performance, to remember words that they have forgotten",
        );
        expect(
            data.definitionGroups[2].senses[1].children[1].text.translation.rawText,
        ).toEqual(
            "提词员，提白员",
        );
        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en",
        );
    });

});
