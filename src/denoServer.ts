import { Application, Router } from "https://deno.land/x/oak@v16.1.0/mod.ts";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem.ts";
import { CambridgeFetcher } from "./CambridgeFetcher.ts";
import { CambridgeSimilar } from "./CambridgeSimilar.ts";

const app = new Application();
const router = new Router();

router.get("/entry/:entry", async (context) => {
  const entry = context.params.entry!;
  const fetcher = new CambridgeFetcher({ entry, isNeedMore: false });

  const data = await fetcher.parse();
  context.response.body = data.entry;
});

router.get("/items/:entry", async (context) => {
  const entry = context.params.entry!;
  let items: LookUpExtensionEntryItem[] = [];
  const fetcher = new CambridgeFetcher({ entry, isNeedMore: false });

  const { entryItems } = await fetcher.parse();

  if (entryItems.length === 0) {
    const similar = new CambridgeSimilar({ keyword: entry });
    items = await similar.parse();
  } else {
    items = entryItems;
  }

  context.response.body = items;
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.env.get("PORT") || 4000;
console.log(`Server running on port ${port}`);
await app.listen({ port: +port });
