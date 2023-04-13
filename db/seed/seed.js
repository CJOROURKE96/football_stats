const db = require('../connection');
const format = require('pg-format');
const {teamData, playerData, playerStatsData, leaguesData} = require('../data/dev_data/index')

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS teams;`)
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS players;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS stats;`)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS leagues;`)
    })
    .then(() => {
      return createTeams();
    })
    .then(() => {
      return createPlayers();
    })
    .then(() => {
      return createPlayerStats();
    })
    .then(() => {
      return createLeague();
    })
    .then(() => {
      return insertTeams();
    })
    .then(() => {
      return insertPlayers();
    })
    .then(() => {
      return insertPlayerStats();
    })
    .then(() => {
      return insertLeagues();
      })
};

function createTeams() {
  return db.query(`CREATE TABLE teams (
        team_id SERIAL PRIMARY KEY,
        team_name VARCHAR(100) NOT NULL,
        location VARCHAR(250) NOT NULL,
        logo_url VARCHAR(250) NOT NULL,
        league_id INT NOT NULL
    )`);
}
function createPlayers() {
    return db.query(`CREATE TABLE players (
          player_id SERIAL PRIMARY KEY,
          player_name VARCHAR(100) NOT NULL,
          position VARCHAR(250) NOT NULL,
          age INT DEFAULT 0 NOT NULL,
          team_id INT REFERENCES teams(team_id) NOT NULL
      )`);
  }
function createPlayerStats() {
    return db.query(`CREATE TABLE stats (
           goals INT DEFAULT 0,
           assists INT DEFAULT 0,
           clean_sheets INT DEFAULT 0,
           num_starts INT DEFAULT 0,
           player_id INT REFERENCES players(player_id) NOT NULL
      )`)
    }
function createLeague() {
    return db.query(`CREATE TABLE leagues (
           league_id SERIAL PRIMARY KEY,
           league_name VARCHAR(200) NOT NULL,
           location VARCHAR(250) NOT NULL
    )`)
}

function insertTeams() {
  const teamsArray = teamData.map((team) => {
    return [team.team_name, team.location, team.logo_url, team.league_id];
  });
  const formattedTeam = format(
    `INSERT INTO teams (
      team_name, location, logo_url, league_id)
      VALUES
      %L RETURNING *;`,
    teamsArray
  );
  return db.query(formattedTeam).then((insertedTeams) => {
    return insertedTeams.rows;
  });
}
  function insertPlayers() {
    const playersArray = playerData.map((player) => {
        return [player.player_name, player.position, player.age, player.team_id];
    });
    const formattedPlayer = format(
        `INSERT INTO players (
            player_name, position, age, team_id)
            VALUES
            %L RETURNING *;`,
            playersArray
    );
    return db.query(formattedPlayer).then((insertedPlayers) => {
        return insertedPlayers.rows;
    });
  }
    function insertPlayerStats() {
        const playersStatsArray = playerStatsData.map((player_stats) => {
            return [player_stats.goals, player_stats.assists, player_stats.clean_sheets, player_stats.num_starts, player_stats.player_id];
        });
        const formattedPlayerStats = format(
            `INSERT INTO stats (
                goals, assists, clean_sheets, num_starts, player_id)
                VALUES
                %L RETURNING *;`,
                playersStatsArray
        );
        return db.query(formattedPlayerStats).then((insertedPlayerStats) => {
            return insertedPlayerStats.rows;
        });
    }
        function insertLeagues() {
            const leaguesArray = leaguesData.map((league) => {
                return [league.league_name, league.location];
            });
            const formattedLeagues = format(
                `INSERT INTO leagues (
                    league_name, location)
                    VALUES
                    %L RETURNING *;`,
                    leaguesArray
            );
            return db.query(formattedLeagues).then((insertedLeagues) => {
                return insertedLeagues.rows;
            });

}

module.exports = { seed };