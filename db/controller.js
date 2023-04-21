const {
  fetchTeams,
  fetchPlayers,
  fetchLeagues,
  fetchFixtures,
  insertTeam,
  insertPlayer,
  insertLeague,
  insertFixture,
  updateLogo,
  updatePlayer,
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

exports.patchTeamLogo = (request, response, next) => {
  const { team_id } = request.params;
  const { logo_url } = request.body;
  updateLogo(team_id, logo_url)
    .then((updatedLogo) => {
      response.status(200).send({ logo_url: updatedLogo });
    })
    .catch(next);
};

exports.patchPlayer = (request, response, next) => {
  const { player_id } = request.params;
  const { position, team_id, age, goals, assists, clean_sheets, num_starts } =
    request.body;
  updatePlayer(
    player_id,
    position,
    team_id,
    age,
    goals,
    assists,
    clean_sheets,
    num_starts
  )
    .then((updatedPlayer) => {
      response.status(200).send({ player: updatedPlayer });
    })
    .catch(next);
};
