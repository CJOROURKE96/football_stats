const db = require('./connection');

exports.fetchTeams = () => {
    return db.query("SELECT * FROM teams").then((teams) => {
        return teams.rows;
    })
}

exports.fetchPlayers = () => {
    return db.query("SELECT * FROM players").then((players) => {
        return players.rows;
    })
}

exports.fetchStats = () => {
    return db.query("SELECT * FROM stats").then((stats) => {
        return stats.rows;
    })
}

exports.fetchLeagues = () => {
    return db.query("SELECT * FROM leagues").then((leagues) => {
        return leagues.rows;
    })
}