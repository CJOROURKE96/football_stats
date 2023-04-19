const db = require("./connection");

exports.fetchTeams = () => {
  return db.query("SELECT * FROM teams").then((teams) => {
    return teams.rows;
  });
};

exports.fetchPlayers = () => {
  return db.query("SELECT * FROM players").then((players) => {
    return players.rows;
  });
};

exports.fetchStats = () => {
  return db.query("SELECT * FROM stats").then((stats) => {
    return stats.rows;
  });
};

exports.fetchLeagues = () => {
  return db.query("SELECT * FROM leagues").then((leagues) => {
    return leagues.rows;
  });
};

exports.fetchFixtures = () => {
  return db.query("SELECT * FROM fixtures").then((fixtures) => {
    return fixtures.rows;
  });
};

exports.insertTeam = (data) => {
  const dataArray = [
    data.team_name,
    data.location,
    data.logo_url,
    data.league_id,
  ];
  return db
    .query(
      `INSERT INTO teams (
        team_name, location, logo_url, league_id) VALUES ($1, $2, $3, $4) RETURNING *;
    `,
      dataArray
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
