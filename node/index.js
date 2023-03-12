import express, { json } from "express";
import { getStacks, setStacks } from "./stacks.js";
import { checkLogin, updateSession, createUser, validateSession } from "./users.js";
const https = await import("https");
import { readFileSync } from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";

let app = express();

app.use(cors());
app.use(json());
app.use(cookieParser());

async function checkSession(req, res, next) {
	const sessionid = req.cookies.sessionid;
	if (sessionid) {
		try {
			await validateSession(sessionid);
			next();
		} catch (e) {
			res.status(400).send({ err: e.message });
		}
	} else {
		res.status(400).send({ err: "Sessionid is undefined." });
	}
}

app.get('/api/checkSessionid', checkSession, (req, res) => {
	res.status(200).send();
});

app.post("/api/login", async (req, res) => {
	const username = req.body.username.toLowerCase();
	const password = req.body.password;

	try {
		await checkLogin(username, password);
		const sessionid = await updateSession(username);
		res.cookie("sessionid", sessionid, { httpOnly: true });
		res.status(200).send()
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
		res.cookie("sessionid", sessionid, { httpOnly: true });
		res.status(200).send();
	} catch (e) {
		res.status(400).send({ err: e.message });
	}
});

app.get("/api/stacks/get", checkSession, async (req, res) => {
	const sessionid = req.cookies.sessionid;

	try {
		const stacks = await getStacks(sessionid);
		res.status(200).send({ stacks: stacks }) //returns {stacks: []}
	}
	catch (e) {
		res.status(400).send({ err: e.message })
	}
});

app.post("/api/stacks/set", checkSession, async (req, res) => {
	const sessionid = req.cookies.sessionid;
	let stacks = req.body.stacks;

	try {
		await setStacks(sessionid, stacks);
		stacks = await getStacks(sessionid);
		res.status(200).send({ stacks: stacks }) //returns {stacks: []}
	}
	catch (e) {
		res.status(400).send({ err: e.message })
	}
});

app.get("/", (req, res) => {
	res.sendFile("home/home.html", { root: "static" });
});

app.get("/login", (req, res) => {
	res.sendFile("login/login.html", { root: "static" });
});

app.get("/overview", (req, res) => {
	res.sendFile("overview/overview.html", { root: "static" });
});

app.get("/create", (req, res) => {
	res.sendFile("karten/createcard.html", { root: "static" });
});

app.get("/learn", (req, res) => {
	res.sendFile("karten/learncard.html", { root: "static" });
});

//host static files with express
app.use(express.static("static"));

app.listen(80, () => {
	console.log("Node running on port localhost:80");
});
