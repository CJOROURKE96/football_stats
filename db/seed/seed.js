const db = require('../connection');
const format = require('pg-format');
const { data } = require('../data/test_db/index');

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS teams`)
    .then(() => {
      return createTeams();
    })
    .then(() => {
      return insertTeams();
    });
};

function createTeams() {
  return db.query(`CREATE TABLE teams (
        team_id SERIAL PRIMARY KEY,
        team_name VARCHAR(100) NOT NULL,
        location VARCHAR(250) NOT NULL,
        logo VARCHAR(250) NOT NULL
    )`);
}

function insertTeams() {
  const teamsArray = data.map((team) => {
    return [team.team_name, team.location, team.logo];
  });
  const formattedTeam = format(
    `INSERT INTO teams (
      team_name, location, logo)
      VALUES
      %L RETURNING *;`,
    teamsArray
  );
  return db.query(formattedTeam).then((insertedTeams) => {
    return insertedTeams.rows;
  });
}
module.exports = { seed };