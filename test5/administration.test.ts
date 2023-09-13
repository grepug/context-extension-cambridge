import { CambridgeFetcher } from "../src/CambridgeFetcher";

describe("test blow", () => {
    let data: any;
    let data_Items: any;
    beforeAll(async () => {
        let fetcher = new CambridgeFetcher({ entry: "administration" });
        data = (await fetcher.parse()).entry;
        data_Items = (await fetcher.parse()).entryItems;
    });


    // 测试释义
    test("senses", () => {
        expect(data.definitionGroups[0].senses[0].children[0].text.rawText).toEqual(
            "the arrangements and tasks needed to control the operation of a plan or organization",
        );
        expect(
            data.definitionGroups[0].senses[0].children[0].text.translation.rawText,
        ).toEqual(
            "管理；经营；行政",
        );

        
        expect(data.definitionGroups[0].senses[0].children[0].text.lang).toEqual(
            "en",
        );
    });

});
