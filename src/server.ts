import express, { Request, Response } from "express";
import { CambridgeFetcher } from "./CambridgeFetcher";

const app = express();
const port = process.env.PORT || 3000;

app.get("/*", (req: Request, res: Response) => {
  let components = req.url.split("/");
  let entry = components[components.length - 1];
  let fetcher = new CambridgeFetcher({ entry });

  fetcher.parse().then((data) => {
    res.send(data);
  });
  // fetcher.similarParse().then((data) => {
  //   res.send(data);
  // });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
