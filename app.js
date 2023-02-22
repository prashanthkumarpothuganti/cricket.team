const express = require("express");
const app = express();

const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const dbPath = path.join(__dirname, "cricketTeam.db");
app.use(express.json());
let db = null;
const initializeDbAndSever = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Is Running on http://localhost:3001");
    });
  } catch (e) {
    console.log(`Db Error is ${e}`);
    process.exit(1);
  }
};
initializeDbAndSever();
//return list of all the players from team
//API 1
const convertDbObject = (ObjectItem) => {
  return {
    playerId: ObjectItem.player_id,
    playerNAme: ObjectItem.player_name,
    jerseyNumber: ObjectItem.jerseyNumber,
    role: ObjectItem.role,
  };
};
app.get("/players/", async (request, response) => {
  const getPlayerQuery = `select * from cricket_team;`;
  const getPlayerQueryResponse = await db.all(getPlayerQuery);
  response.send(
    getPlayerQueryResponse.map((eachPlayer) => convertDbObject(eachPlayer))
  );
});
module.exports = app;
