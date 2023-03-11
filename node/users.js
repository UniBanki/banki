import { randomBytes } from "crypto";
import { dbo } from "./config.js";

export async function checkLogin(username, password) {
  return new Promise(async function (resolve, reject) {
    const query = { username: username, password: password };
    try {
      const response = await dbo.collection("users").find(query).toArray();
      if (response && response.length > 0) {
        resolve("");
      } else {
        throw new Error("Nutzername oder Passwort ist falsch.");
      }
    } catch (e) {
      reject(e);
    }
  });
}

export async function updateSession(username) {
  return new Promise(async function (resolve, reject) {
    try {
      const sessionid = await generateSessionID();
      const query = { username: username };
      const newvalues = { $set: { sessionid: sessionid } };

      await dbo.collection("users").updateOne(query, newvalues);
      resolve(sessionid);
    } catch (e) {
      reject(e);
    }
  });
}

async function generateSessionID() {
  return new Promise(function (resolve, reject) {
    randomBytes(16, (err, num) => {
      if (err) {
        reject(new Error("Konnte keine Session ID erstellen."));
      }
      if (typeof num.toString("hex") !== "string") {
        reject(new Error("Session is not string"));
      }
      resolve(num.toString("hex"));
    });
  });
}

async function usernameAvailable(username) {
  return new Promise(async function (resolve, reject) {
    const query = { username: username };

    try {
      const result = await dbo.collection("users").find(query).toArray();
      if (result && result.length > 0) {
        throw new Error("Nutzername existiert bereits.");
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
}

export async function createUser(username, password) {
  return new Promise(async function (resolve, reject) {
    try {
      await usernameAvailable(username);
      if (
        !username.match(/^(?=[a-zA-Z\d._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      ) {
        throw new Error("Nutzername passt nicht zu den Richtlinien.");
      }
      if (!password.match(/^(?=[a-zA-Z\d._@$!%*#?&]{5,20}$).*$/)) {
        throw new Error("Passwort passt nicht zu den Richtlinien.");
      }
      const newuser = { username: username, password: password, sessionid:"", stacks:[] };

      await dbo.collection("users").insertOne(newuser);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

export async function validateSession(sessionid) {
  return new Promise(async function (resolve, reject) {
    try {
      const query = { sessionid: sessionid };
      const result = await dbo
        .collection("users")
        .findOne(query, { projection: { _id: 1 } });
      if (result._id) {
        resolve(result._id);
      }
    } catch (e) {
      reject(new Error("Session ID ist ungültig. Bitte ausloggen."));
    }
  });
}
