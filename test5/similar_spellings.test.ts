import { CambridgeFetcher } from "../src/CambridgeFetcher";
import { CambridgeSimilar } from "../src/CambridgeSimilar";

describe("test similar spellings", () => {
    let data: any;
    beforeAll(async () => {
        let keyword = "similar spellings"
        let fetcher = new CambridgeFetcher({ entry: keyword });

        let { entryItems } = await fetcher.parse();

        if (entryItems.length == 0) {
            let similar = new CambridgeSimilar({ keyword });

            data = await similar.parse();
        } else {
            data = entryItems;
        }

    });

    //测试推荐词数量
    test("test ", () => {
        expect(data.length).toEqual(7);

        expect(data[0].title).toEqual("misspellings");
        expect(data[0].url).toEqual("https://dictionary.cambridge.org/search/english-chinese-simplified/direct/?q=misspellings");


    });

});
