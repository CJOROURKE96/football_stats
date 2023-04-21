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

exports.insertLeague = (data) => {
  const dataArray = [data.league_name, data.location];
  return db
    .query(
      `INSERT INTO leagues (
          league_name, location) VALUES ($1, $2) RETURNING *;
      `,
      dataArray
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.insertFixture = (data) => {
  const dataArray = [
    data.home_team_id,
    data.away_team_id,
    data.fixture_date,
    data.fixture_time,
    data.result,
  ];
  return db
    .query(
      `INSERT INTO fixtures (
            home_team_id, away_team_id, fixture_date, fixture_time, result) VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `,
      dataArray
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateLogo = (team_id, logo_url) => {
  const query = `UPDATE teams SET logo_url = $1 WHERE team_id = $2 RETURNING *`;
  return db.query(query, [logo_url, team_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 400, message: "Not found " });
    } else return rows[0].logo_url;
  });
};

exports.updatePlayer = (
  player_id,
  position,
  team_id,
  age,
  goals,
  assists,
  clean_sheets,
  num_starts
) => {
  const query = `UPDATE players SET position = COALESCE($1, position), team_id = COALESCE($2, team_id), age = COALESCE($3, age), goals = COALESCE($4, goals), 
  assists = COALESCE($5, assists), clean_sheets = COALESCE($6, clean_sheets), num_starts = COALESCE($7, num_starts) WHERE player_id = $8 RETURNING *`;
  return db
    .query(query, [
      position,
      team_id,
      age,
      goals,
      assists,
      clean_sheets,
      num_starts,
      player_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 400, message: "Not found" });
      } else return rows[0];
    });
};
