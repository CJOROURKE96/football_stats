const request = require("supertest");
const seed = require("../db/seed/seed");
const app = require("../db/app");
const db = require("../db/connection");
const teamData = require("../db/data/test_db/teams");
const playerData = require("../db/data/test_db/players");
const playerStatsData = require("../db/data/test_db/stats");
const leaguesData = require("../db/data/test_db/leagues");

beforeEach(() => {
  return seed({ teamData, playerData, playerStatsData, leaguesData });
});

afterAll(() => {
  db.end();
});

describe("app", () => {
  describe("GET/api/leagues", () => {
    test("returns an array of leagues objects with status code 200", () => {
      return request(app)
        .get("/api/leagues")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(1);
          body.forEach((league) => {
            expect(league).toHaveProperty("league_name", expect.any(String));
            expect(league).toHaveProperty("location", expect.any(String));
          });
        });
    });
  });
});

describe("app", () => {
  describe("GET/api/teams", () => {
    test("returns an array of team objects with status code 200", () => {
      return request(app)
        .get("/api/teams")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(5);
          body.forEach((team) => {
            expect(team).toHaveProperty("team_name", expect.any(String));
            expect(team).toHaveProperty("location", expect.any(String));
            expect(team).toHaveProperty("logo_url", expect.any(String));
            expect(team).toHaveProperty("league_id", expect.any(Number));
          });
        });
    });
  });
});
describe("app", () => {
  describe("GET/api/players", () => {
    test("returns an array of player objects with status code 200", () => {
      return request(app)
        .get("/api/players")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(5);
          body.forEach((player) => {
            expect(player).toHaveProperty("player_name", expect.any(String));
            expect(player).toHaveProperty("position", expect.any(String));
            expect(player).toHaveProperty("age", expect.any(Number));
          });
        });
    });
  });
});

describe("app", () => {
  describe("GET/api/playerStats", () => {
    test("returns an array of player stats objects with status code 200", () => {
      return request(app)
        .get("/api/stats")
        .expect(200)
        .then(({ body }) => {
          expect(body.length).toBe(5);
          body.forEach((player) => {
            expect(player).toHaveProperty("goals", expect.any(Number));
            expect(player).toHaveProperty("assists", expect.any(Number));
            expect(player).toHaveProperty("clean_sheets", expect.any(Number));
            expect(player).toHaveProperty("num_starts", expect.any(Number));
            expect(player).toHaveProperty("player_id", expect.any(Number));
          });
        });
    });
  });
});

describe("app", () => {
  describe("POST/api/teams", () => {
    test("posts a new team with status code 201 when successfull", () => {
      const testNewTeam = {
        team_name: "Preston Warriors",
        location: "Preston",
        logo_url:
          "https://cdn.worldvectorlogo.com/logos/golden-state-warriors-3.svg",
        league_id: 1,
      };
      return request(app)
        .post("/api/teams")
        .send(testNewTeam)
        .expect(201)
        .then(({ body }) => {
          expect(body.team.team_name).toEqual("Preston Warriors");
          expect(body.team.location).toEqual("Preston");
          expect(body.team.league_id).toEqual(1);
        });
    });
  });
});

describe("app", () => {
  describe("POST/api/players", () => {
    test("posts a new player with status code 201 when successfull", () => {
      const testNewPlayer = {
        player_name: "Connor O'Rourke",
        position: "ST",
        age: 27,
        team_id: 3,
      };
      return request(app)
        .post("/api/players")
        .send(testNewPlayer)
        .expect(201)
        .then(({ body }) => {
          expect(body.player.player_name).toEqual("Connor O'Rourke");
          expect(body.player.age).toEqual(27);
          expect(body.player.position).toEqual("ST");
        });
    });
  });
});
