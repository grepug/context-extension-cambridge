import { LookUpExtensionEntryItem } from "../../src/types/LookUpExtensionEntryItem";
import { CambridgeFetcher } from "../../src/CambridgeFetcher";
describe("test lookk", () => {
    let data: any;

    beforeAll(async () => {
        // let items: LookUpExtensionEntryItem[] = [];
        let fetcher = new CambridgeFetcher({ entry: "lookk" });
        let items = await fetcher.similarParse();
        data = items;
    });
    test("test lookk", () => {
        expect(data.length).toEqual(10);
        // expect(data[0].title).toEqual("look");
        // expect(data[0].url).toEqual("/dictionary/english/look");
        // expect(data[0].id).toEqual("look");
    });
});