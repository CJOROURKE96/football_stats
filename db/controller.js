const {
  fetchTeams,
  fetchPlayers,
  fetchLeagues,
  fetchFixtures,
  insertTeam,
  insertPlayer,
} = require("./model");

exports.getTeams = (request, response, next) => {
  fetchTeams()
    .then((teams) => {
      response.status(200).send(teams);
    })
    .catch(next);
};

exports.getPlayers = (request, response, next) => {
  fetchPlayers()
    .then((players) => {
      response.status(200).send(players);
    })
    .catch(next);
};

exports.getLeagues = (request, response, next) => {
  fetchLeagues()
    .then((leagues) => {
      response.status(200).send(leagues);
    })
    .catch(next);
};

exports.getFixtures = (request, response, next) => {
  fetchFixtures()
    .then((fixtures) => {
      response.status(200).send(fixtures);
    })
    .catch(next);
};

exports.postNewTeam = (request, response, next) => {
  insertTeam(request.body)
    .then((newTeam) => {
      response.status(201).send({ team: newTeam });
    })
    .catch(next);
};

exports.postNewPlayer = (request, response, next) => {
  insertPlayer(request.body)
    .then((newPlayer) => {
      response.status(201).send({ player: newPlayer });
    })
    .catch(next);
};
