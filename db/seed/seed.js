const db = require('../connection');
const format = require('pg-format');

const seed = ({teamData, playerData, playerStatsData, leaguesData}) => {
  return db
    .query(`DROP TABLE IF EXISTS teams CASCADE;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS players CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS stats CASCADE;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS leagues CASCADE;`)
    })
    .then(() => {
        return db.query(`CREATE TABLE teams (
                team_id SERIAL PRIMARY KEY,
                team_name VARCHAR(100) NOT NULL,
                location VARCHAR(250) NOT NULL,
                logo_url VARCHAR(250) NOT NULL,
                league_id INT NOT NULL
            );`);           
    })
    .then(() => {
        return db.query(`CREATE TABLE players (
                player_id SERIAL PRIMARY KEY,
                player_name VARCHAR(100) NOT NULL,
                position VARCHAR(250) NOT NULL,
                age INT DEFAULT 0 NOT NULL,
                team_id INT NOT NULL
               );`);
    })
    .then(() => {
        return db.query(`CREATE TABLE stats (
                goals INT DEFAULT 0,
                assists INT DEFAULT 0,
                clean_sheets INT DEFAULT 0,
                num_starts INT DEFAULT 0,
                player_id INT NOT NULL
           );`);
    })
    .then(() => {
        return db.query(`CREATE TABLE leagues (
                   league_id SERIAL PRIMARY KEY,
                   league_name VARCHAR(200) NOT NULL,
                   location VARCHAR(250) NOT NULL
            );`);
    })     
    .then(() => {   
          const formattedTeam = format(
            `INSERT INTO teams (
              team_name, location, logo_url, league_id)
              VALUES
              %L;`,
            teamData.map(({team_name, location, logo_url, league_id}) => {
                return [team_name, location, logo_url, league_id]
            })
          );
          const formattedTeamsPromise = db.query(formattedTeam).then((insertedTeams) => {
            return insertedTeams.rows;
          });
    
          const formattedPlayer = format(
              `INSERT INTO players (
                  player_name, position, age, team_id)
                  VALUES
                  %L;`,
                  playerData.map(({player_name, position, age, team_id}) => {
                     return [player_name, position, age, team_id];
                  })
          );
          const formattedPlayersPromise =  db.query(formattedPlayer).then((insertedPlayers) => {
              return insertedPlayers.rows;
          });

          const formattedPlayerStats = format(
                `INSERT INTO stats (
                    goals, assists, clean_sheets, num_starts, player_id)
                    VALUES
                    %L RETURNING *;`,
                    playerStatsData.map(({goals, assists, clean_sheets, num_starts, player_id}) => {
                       return [goals, assists, clean_sheets, num_starts, player_id];
                    })
            );
            const formattedPlayerStatsPromise = db.query(formattedPlayerStats).then((insertedPlayerStats) => {
                return insertedPlayerStats.rows;
            });

            const formattedLeagues = format(
                `INSERT INTO leagues (
                    league_name, location)
                    VALUES
                    %L RETURNING *;`,
                    leaguesData.map(({league_name, location}) => {
                        return [league_name, location];
                    })
            );
            const formattedLeaguesPromise = db.query(formattedLeagues).then((insertedLeagues) => {
                return insertedLeagues.rows;
            });
            return Promise.all([formattedTeamsPromise, formattedPlayersPromise, formattedPlayerStatsPromise, formattedLeaguesPromise])
        })
     
    }
  
module.exports = seed;