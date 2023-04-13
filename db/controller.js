const {fetchTeams, fetchPlayers, fetchStats, fetchLeagues} = require('./model')

exports.getTeams = (request, response, next) => {
    fetchTeams().then((teams) => {
       response.status(200).send(teams);
    })
};

exports.getPlayers = (request, response, next) => {
     fetchPlayers().then((players) => {
        response.status(200).send(players);
     })
}

exports.getStats = (request, response, next) => {
    fetchStats().then((stats) => {
       response.status(200).send(stats);
    })
}

exports.getLeagues = (request, response, next) => {
    fetchLeagues().then((leagues) => {
       response.status(200).send(leagues);
    })
}