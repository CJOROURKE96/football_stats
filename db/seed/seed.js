const db = require('../connection');
const format = require('pg-format');
const {teamData} = require('../data/dev_data/index')

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
        logo_url VARCHAR(250) NOT NULL
    )`);
}

function insertTeams() {
  const teamsArray = teamData.map((team) => {
    return [team.team_name, team.location, team.logo_url];
  });
  const formattedTeam = format(
    `INSERT INTO teams (
      team_name, location, logo_url)
      VALUES
      %L RETURNING *;`,
    teamsArray
  );
  return db.query(formattedTeam).then((insertedTeams) => {
    return insertedTeams.rows;
  });
}
module.exports = { seed };