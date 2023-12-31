import express, { Response, Request } from "express";
import axios from "axios";

const app = express();
const port = 3000;

const servers = [1, 2];

let currentServer = 1;

app.get("*", async (req: Request, res: Response) => {
  console.time("request");
  axios({
    method: req.method,
    url: `http://localhost:${3000 + servers[currentServer]}` + req.url,
    data: req.body,
    headers: req.headers,
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
  console.timeEnd("request");
  currentServer = (currentServer + 1) % servers.length;
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
