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

exports.insertPlayer = (data) => {
  const dataArray = [
    data.player_name,
    data.position,
    data.age,
    data.team_id,
    data.goals,
    data.assists,
    data.clean_sheets,
    data.num_starts,
  ];
  return db
    .query(
      `INSERT INTO players (
        player_name, position, age, team_id, goals, assists, clean_sheets, num_starts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `,
      dataArray
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
