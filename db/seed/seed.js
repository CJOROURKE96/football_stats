const db = require("../connection");
const format = require("pg-format");

const seed = ({ teamData, playerData, leaguesData, fixturesData }) => {
  return db
    .query(`DROP TABLE IF EXISTS teams CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS players CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS leagues CASCADE;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS fixtures CASCADE;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE leagues (
                   league_id SERIAL PRIMARY KEY,
                   league_name VARCHAR(200) NOT NULL,
                   location VARCHAR(250) NOT NULL
            );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE teams (
                team_id SERIAL PRIMARY KEY,
                team_name VARCHAR(100) NOT NULL,
                location VARCHAR(250) NOT NULL,
                logo_url VARCHAR(250) NOT NULL,
                league_id INT NOT NULL REFERENCES leagues(league_id)
            );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE players (
                player_id SERIAL PRIMARY KEY,
                player_name VARCHAR(100) NOT NULL,
                position VARCHAR(250) NOT NULL,
                age INT DEFAULT 0 NOT NULL,
                team_id INT NOT NULL REFERENCES teams(team_id),
                goals INT DEFAULT 0,
                assists INT DEFAULT 0,
                clean_sheets INT DEFAULT 0,
                num_starts INT DEFAULT 0
               );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE fixtures (
                    fixture_id SERIAL PRIMARY KEY,
                    home_team_id INT NOT NULL REFERENCES teams(team_id),
                    away_team_id INT NOT NULL REFERENCES teams(team_id),
                    fixture_date VARCHAR(50) NOT NULL,
                    fixture_time VARCHAR(50) NOT NULL,
                    result VARCHAR(10) DEFAULT NULL
                );`);
    })
    .then(() => {
      const formattedLeagues = format(
        `INSERT INTO leagues (
                league_name, location)
                VALUES
                %L RETURNING *;`,
        leaguesData.map(({ league_name, location }) => [league_name, location])
      );
      return db.query(formattedLeagues);
    })

    .then(() => {
      const formattedTeam = format(
        `INSERT INTO teams (
            team_name, location, logo_url, league_id)
            VALUES
            %L;`,
        teamData.map(({ team_name, location, logo_url, league_id }) => [
          team_name,
          location,
          logo_url,
          league_id,
        ])
      );
      return db.query(formattedTeam);
    })

    .then(() => {
      const formattedPlayer = format(
        `INSERT INTO players (
                  player_name, position, age, team_id, goals, assists, clean_sheets, num_starts)
                  VALUES
                  %L RETURNING *;`,
        playerData.map(
          ({
            player_name,
            position,
            age,
            team_id,
            goals,
            assists,
            clean_sheets,
            num_starts,
          }) => [
            player_name,
            position,
            age,
            team_id,
            goals,
            assists,
            clean_sheets,
            num_starts,
          ]
        )
      );
      return db.query(formattedPlayer);
    })

    .then(() => {
      const formattedFixtures = format(
        `INSERT INTO fixtures (
                    home_team_id, away_team_id, fixture_date, fixture_time, result)
                    VALUES
                    %L;`,
        fixturesData.map(
          ({
            home_team_id,
            away_team_id,
            fixture_date,
            fixture_time,
            result,
          }) => [home_team_id, away_team_id, fixture_date, fixture_time, result]
        )
      );
      return db.query(formattedFixtures);
    });
};

module.exports = seed;
