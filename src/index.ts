import { CambridgeFetcher } from "./CambridgeFetcher";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";
import { Entry } from "./types/type";

async function fetchEntryItems(keyword: string): Promise<string> {
  let items: LookUpExtensionEntryItem[] = [];
  let fetcher = new CambridgeFetcher({ entry: keyword });
  let item = await fetcher.similarParse();
  console.log(item,'item');
  
    // items.push(...item);
  return JSON.stringify(items);
}

async function fetchEntry(
  id: string,
  title: string,
  url: string
): Promise<string> {
  let fetcher = new CambridgeFetcher({ entry: title });
  let entry: Entry = await fetcher.parse();

  return JSON.stringify(entry);
}

//@ts-ignore
globalThis["fetchEntryItems"] = fetchEntryItems;
//@ts-ignore
globalThis["fetchEntry"] = fetchEntry;
