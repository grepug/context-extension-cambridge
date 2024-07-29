import { CambridgeFetcher } from "./CambridgeFetcher.ts";
import { CambridgeSimilar } from "./CambridgeSimilar.ts";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem.ts";

export async function fetchEntryItems(keyword: string): Promise<string> {
  // 
  keyword = encodeURIComponent(keyword);
  let items: LookUpExtensionEntryItem[] = [];
  let fetcher = new CambridgeFetcher({ entry: keyword, isNeedMore: false });

  let { entryItems } = await fetcher.parse();

  if (entryItems.length == 0) {
    let similar = new CambridgeSimilar({ keyword });

    items = await similar.parse();
  } else {
    items = entryItems;
  }

  return JSON.stringify(items);
}

export async function fetchEntry(
  title: string,
  url: string,
): Promise<string> {
  let fetcher = new CambridgeFetcher({ entry: title, url, isNeedMore: false });
  let { entry } = await fetcher.parse();

  return JSON.stringify(entry);
}

//@ts-ignore
globalThis["fetchEntryItems"] = fetchEntryItems;
//@ts-ignore
globalThis["fetchEntry"] = fetchEntry;
