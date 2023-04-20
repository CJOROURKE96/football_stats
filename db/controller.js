const {
  fetchTeams,
  fetchPlayers,
  fetchLeagues,
  fetchFixtures,
  insertTeam,
  insertPlayer,
  insertLeague,
  insertFixture,
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

exports.postNewLeague = (request, response, next) => {
  insertLeague(request.body)
    .then((newLeague) => {
      response.status(201).send({ league: newLeague });
    })
    .catch(next);
};

exports.postNewFixture = (request, response, next) => {
  insertFixture(request.body)
    .then((newFixture) => {
      response.status(201).send({ fixture: newFixture });
    })
    .catch(next);
};
