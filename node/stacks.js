import { dbo } from "./config.js";

export async function getStacks(sessionid) {
  return new Promise(async function (resolve, reject) {
    try {
      let res_stacks = {};
      const query = { sessionid:sessionid };
      const result = await dbo
        .collection("users")
        .findOne(query, { projection: { _id: 0, stacks: 1 } });
      resolve(result.stacks);
    } catch (e) {
      reject(e);
    }
  });
}

export async function setStacks(sessionid, stacks){
    return new Promise(async function (resolve, reject) {
        try {
            const query = { sessionid: sessionid };
            const newvalues = { $set: { stacks: stacks } };
      
            await dbo.collection("users").updateOne(query, newvalues);
            resolve();
        } catch (e) {
          reject(e);
        }
      });
}
