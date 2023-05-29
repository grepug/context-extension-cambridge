import express, { Request, Response } from "express";
import { CambridgeFetcher } from "./CambridgeFetcher";
import { CambridgeSimilar } from "./CambridgeSimilar";
import { LookUpExtensionEntryItem } from "./types/LookUpExtensionEntryItem";

const app = express();
const port = process.env.PORT || 3000;

app.get("/entry/*", (req: Request, res: Response) => {
  let components = req.url.split("/");
  let entry = components[components.length - 1];
  let fetcher = new CambridgeFetcher({ entry });

  fetcher.parse().then((data) => {
    res.send(data);
  });
});

app.get("/items/*", async (req: Request, res: Response) => {
  let components = req.url.split("/");
  let entry = components[components.length - 1];
  let items: LookUpExtensionEntryItem[] = [];
  let fetcher = new CambridgeFetcher({ entry: entry });

  let { entryItems } = await fetcher.parse();

  if (entryItems.length == 0) {
    let similar = new CambridgeSimilar({ keyword: entry });

    items = await similar.parse();
  } else {
    items = entryItems;
  }
  res.send(items);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
