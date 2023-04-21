const request = require("supertest");
const seed = require("../db/seed/seed");
const app = require("../db/app");
const db = require("../db/connection");
const teamData = require("../db/data/test_db/teams");
const playerData = require("../db/data/test_db/players");
const leaguesData = require("../db/data/test_db/leagues");
const fixturesData = require("../db/data/test_db/fixtures");

beforeEach(() => {
  return seed({
    teamData,
    playerData,
    leaguesData,
    fixturesData,
  });
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
            expect(player).toHaveProperty("team_id", expect.any(Number));
            expect(player).toHaveProperty("goals", expect.any(Number));
            expect(player).toHaveProperty("assists", expect.any(Number));
            expect(player).toHaveProperty("clean_sheets", expect.any(Number));
            expect(player).toHaveProperty("num_starts", expect.any(Number));
          });
        });
    });
  });
});

describe("GET/api/fixtures", () => {
  test("returns an array of all the fixtures with status code 200", () => {
    return request(app)
      .get("/api/fixtures")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(7);
        body.forEach((fixture) => {
          expect(fixture).toHaveProperty("home_team_id", expect.any(Number));
          expect(fixture).toHaveProperty("away_team_id", expect.any(Number));
          expect(fixture).toHaveProperty("fixture_date", expect.any(String));
          expect(fixture).toHaveProperty("fixture_time", expect.any(String));
          expect(fixture).toHaveProperty("result", expect.any(String));
        });
      });
  });
});

describe("app", () => {
  describe("POST/api/teams", () => {
    test("posts a new team with status code 201 when successful", () => {
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
    test("posts a new player with status code 201 when successful", () => {
      const testNewPlayer = {
        player_name: "Connor O'Rourke",
        position: "ST",
        age: 27,
        team_id: 3,
        goals: 35,
        assists: 15,
        clean_sheets: 1,
        num_starts: 40,
      };
      return request(app)
        .post("/api/players")
        .send(testNewPlayer)
        .expect(201)
        .then(({ body }) => {
          expect(body.player.player_name).toEqual("Connor O'Rourke");
          expect(body.player.age).toEqual(27);
          expect(body.player.position).toEqual("ST");
          expect(body.player.team_id).toEqual(3);
          expect(body.player.goals).toEqual(35);
          expect(body.player.assists).toEqual(15);
          expect(body.player.clean_sheets).toEqual(1);
          expect(body.player.num_starts).toEqual(40);
        });
    });
  });
});

describe("app", () => {
  describe("POST/api/leagues", () => {
    test("posts a new league with status code 201 when successful", () => {
      const testNewLeague = {
        league_name: "Warrington Under 7's",
        location: "Warrington",
      };
      return request(app)
        .post("/api/leagues")
        .send(testNewLeague)
        .expect(201)
        .then(({ body }) => {
          expect(body.league.league_name).toEqual("Warrington Under 7's");
          expect(body.league.location).toEqual("Warrington");
        });
    });
  });
});

describe("app", () => {
  describe("POST/api/fixtures", () => {
    test("posts a new league with status code 201 when successful", () => {
      const testNewFixture = {
        home_team_id: 1,
        away_team_id: 5,
        fixture_date: "2023-06-11",
        fixture_time: "17:30:00",
        result: "",
      };
      return request(app)
        .post("/api/fixtures")
        .send(testNewFixture)
        .expect(201)
        .then(({ body }) => {
          expect(body.fixture.home_team_id).toEqual(1);
          expect(body.fixture.away_team_id).toEqual(5);
          expect(body.fixture.fixture_date).toEqual("2023-06-11");
          expect(body.fixture.fixture_time).toEqual("17:30:00");
          expect(body.fixture.result).toEqual("");
        });
    });
  });
});

describe("PATCH/api/teams/:team_id", () => {
  test("can remove and replace the logo_url", () => {
    const newLogoUrl = {
      logo_url:
        "https://c8.alamy.com/comp/MJWPAH/football-team-emblem-template-with-soccer-ball-design-element-for-logo-labelsign-badge-vector-illustration-MJWPAH.jpg",
    };
    return request(app)
      .patch("/api/teams/1")
      .send(newLogoUrl)
      .expect(200)
      .then(({ body }) => {
        expect(body.logo_url).toBe(
          "https://c8.alamy.com/comp/MJWPAH/football-team-emblem-template-with-soccer-ball-design-element-for-logo-labelsign-badge-vector-illustration-MJWPAH.jpg"
        );
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players position", () => {
    const newPosition = {
      position: "RB",
    };
    return request(app)
      .patch("/api/players/2")
      .send(newPosition)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.position).toBe("RB");
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players age", () => {
    const newAge = {
      age: 22,
    };
    return request(app)
      .patch("/api/players/2")
      .send(newAge)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.age).toBe(22);
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players team", () => {
    const newTeam = {
      team_id: 2,
    };
    return request(app)
      .patch("/api/players/2")
      .send(newTeam)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.team_id).toBe(2);
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players goals", () => {
    const newGoals = {
      goals: 2,
    };
    return request(app)
      .patch("/api/players/2")
      .send(newGoals)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.goals).toBe(2);
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players assists", () => {
    const newAssists = {
      assists: 5,
    };
    return request(app)
      .patch("/api/players/4")
      .send(newAssists)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.assists).toBe(5);
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players clean_sheets", () => {
    const newCleanSheet = {
      clean_sheets: 4,
    };
    return request(app)
      .patch("/api/players/1")
      .send(newCleanSheet)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.clean_sheets).toBe(4);
      });
  });
});

describe("PATCH/api/players/:player_id", () => {
  test("can update a players num_starts", () => {
    const newNumStarts = {
      num_starts: 11,
    };
    return request(app)
      .patch("/api/players/5")
      .send(newNumStarts)
      .expect(200)
      .then(({ body }) => {
        expect(body.player.num_starts).toBe(11);
      });
  });
});
