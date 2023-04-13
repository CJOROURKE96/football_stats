const {fetchTeams, fetchPlayers, fetchStats, fetchLeagues, insertTeam} = require('./model')

exports.getTeams = (request, response, next) => {
    fetchTeams().then((teams) => {
       response.status(200).send(teams);
    })
    .catch(next)
};

exports.getPlayers = (request, response, next) => {
     fetchPlayers().then((players) => {
        response.status(200).send(players);
     })
     .catch(next)
}

exports.getStats = (request, response, next) => {
    fetchStats().then((stats) => {
       response.status(200).send(stats);
    })
    .catch(next)
}

exports.getLeagues = (request, response, next) => {
    fetchLeagues().then((leagues) => {
       response.status(200).send(leagues);
    })
    .catch(next)
}

exports.postNewTeam = (request, response, next) => {
    insertTeam(request.body)
      .then((newTeam) => {
        response.status(201).send({team: newTeam})
      })
      .catch(next)
}