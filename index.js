import express, { json } from "express";
import { getStacks, setStacks } from "./stacks.js";
import { checkLogin, updateSession, createUser, validateSession } from "./users.js";
const https = await import("https");
import { readFileSync } from "fs";
import cors from "cors";
let app = express();

app.use(cors());
app.use(json());

app.post("/api/login", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  try {
    await checkLogin(username, password);
    const sessionid = await updateSession(username);
    res.status(200).send({ sessionid: sessionid })
  } catch (e) {
    res.status(400).send({ err: e.message })
  }

});

app.post("/api/register", async (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  try {
    await createUser(username, password);
    const sessionid = await updateSession(username);
    res.status(200).send({ sessionid: sessionid });
  } catch (e) {
    res.status(400).send({ err: e.message });
  }
});

app.post("/api/stacks/get", async (req, res) => {
  const sessionid = req.body.sessionid;

  try {
    await validateSession(sessionid);
    const stacks = await getStacks(sessionid);
    res.status(200).send(stacks)
  }
  catch (e) {
    res.status(400).send({ err: e.message })
  }
});

app.post("/api/stacks/set", async (req, res) => {
  const sessionid = req.body.sessionid;
  let stacks = req.body.stacks;

  try {
    await validateSession(sessionid);
    await setStacks(sessionid, stacks);
    stacks = await getStacks(sessionid);
    res.status(200).send(stacks)
  }
  catch (e) {
    res.status(400).send({ err: e.message })
  }
});

const httpsServer = https.createServer(
  {
    key: readFileSync(
      "/etc/letsencrypt/live/h2992036.stratoserver.net/privkey.pem"
    ),
    cert: readFileSync(
      "/etc/letsencrypt/live/h2992036.stratoserver.net/fullchain.pem"
    ),
  },
  app
);

httpsServer.listen(443, () => {
  console.log("Node running on port 443(https)");
});
