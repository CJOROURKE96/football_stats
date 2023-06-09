const express = require("express");

const {
  getTeams,
  getPlayers,
  getLeagues,
  getFixtures,
  postNewTeam,
  postNewPlayer,
  postNewLeague,
  postNewFixture,
  patchTeamLogo,
  patchPlayer,
} = require("./controller");

const app = express();

app.use(express.json());

app.get("/api/teams", getTeams);
app.get("/api/players", getPlayers);
app.get("/api/leagues", getLeagues);
app.get("/api/fixtures", getFixtures);
app.post("/api/teams/", postNewTeam);
app.post("/api/players", postNewPlayer);
app.post("/api/leagues", postNewLeague);
app.post("/api/fixtures", postNewFixture);
app.patch("/api/teams/:team_id", patchTeamLogo);
app.patch("/api/players/:player_id", patchPlayer);

app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
