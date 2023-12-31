import path from "path";
import { template1 } from "./template1";
import express, { Response, Request } from "express";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import queue from "express-queue";

const app = express();
// take node cli args
const args = process.argv.slice(2);

app.use(queue({ activeLimit: 4, queuedLimit: -1 }));

const port = args[0];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browser = await puppeteer.launch();
const page = await browser.newPage();

let counter = 0;
let fileName = "";

app.get("/app/print", async (req: Request, res: Response) => {
  fileName = `output-${port}-${counter}.pdf`;

  const html = template1("req number" + req.query.number);

  await page.setContent(html);

  await page.pdf({ path: "src/output/" + fileName });

  const filePath = path.join(__dirname, "/output", fileName);

  res.send(filePath);
  console.log(++counter);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
