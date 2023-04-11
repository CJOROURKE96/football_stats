const db = require ("../connection");

const format = require ("pg-format");

const seed = () => {
    return db.query("DROP TABLE IF EXISTS teams").then(() => {
        return createTeams()
    })
}

function createTeams() {
    return db.query(`CREATE TABLE teams(
        team_id SERIAL PRIMARY KEY,
        team_name VARCHAR(200) NOT NULL,
        location VARCHAR(200) NOT NULL,
        logo VARCHAR(1000) NOT NULL,
    )` )
}