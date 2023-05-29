import { LookUpExtensionEntryItem } from "../../src/types/LookUpExtensionEntryItem";
import { CambridgeFetcher } from "../../src/CambridgeFetcher";
import { CambridgeSimilar } from "../../src/CambridgeSimilar";
describe("test lookk", () => {
    let data: any;

    beforeAll(async () => {
        let items: LookUpExtensionEntryItem[] = [];
        let fetcher = new CambridgeFetcher({ entry: "lookk" });
      
        let { entryItems } = await fetcher.parse();
      
        if (entryItems.length == 0) {
          let similar = new CambridgeSimilar({ keyword:"lookk" });
      
          items = await similar.parse();
        } else {
          items = entryItems;
        }
        data = items;
    });
    test("test lookk", () => {
        expect(data.length).toEqual(10);
        // expect(data[0].title).toEqual("look");
        // expect(data[0].url).toEqual("/dictionary/english/look");
        // expect(data[0].id).toEqual("look");
    });
});