const request = require('supertest');
const seed = require('../db/seed/seed');
const app = require('../db/app');
const db = require('../db/connection')
const data = require('../db/data/test_db');
const { beforeEach } = require('node:test');

beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    db.end();
});

describe('app', () => {
    describe('GET/api/teams', () => {
      test('returns an array of team objects with status code 200', () => {
        return request(app)
         .get('/api/teams')
         .expect(200)
         .then(({body}) => {
            expect(body.length).toBe(5);
            body.forEach((team) => {
                expect(team).toHaveProperty('team_name', expect.any(String))
                expect(team).toHaveProperty('location', expect.any(String))
                expect(team).toHaveProperty('logo_url', expect.any(String))
                expect(team).toHaveProperty('league_id', expect.any(Number))
            })
         })
      })
    })

describe('app', () => {
    describe('GET/api/players', () => {
      test('returns an array of player objects with status code 200', () => {
        return request(app)
         .get('/api/players')
         .expect(200)
         .then(({body}) => {
            expect(body.length).toBe(5);
            body.forEach((player) => {
                expect(player).toHaveProperty('player_name', expect.any(String))
                expect(player).toHaveProperty('position', expect.any(String))
                expect(player).toHaveProperty('age', expect.any(Number))
            })
         })
      })
    })
})

describe('app', () => {
    describe('GET/api/playerStats', () => {
      test('returns an array of player stats objects with status code 200', () => {
        return request(app)
         .get('/api/stats')
         .expect(200)
         .then(({body}) => {
            expect(body.length).toBe(5);
            body.forEach((player) => {
                expect(player).toHaveProperty('goals', expect.any(Number))
                expect(player).toHaveProperty('assists', expect.any(Number))
                expect(player).toHaveProperty('clean_sheets', expect.any(Number))
                expect(player).toHaveProperty('num_starts', expect.any(Number))
                expect(player).toHaveProperty('player_id', expect.any(Number))
            })
         })
      })
    })
})

describe('app', () => {
    describe('GET/api/leagues', () => {
      test('returns an array of leagues objects with status code 200', () => {
        return request(app)
         .get('/api/leagues')
         .expect(200)
         .then(({body}) => {
            expect(body.length).toBe(1);
            body.forEach((league) => {
                expect(league).toHaveProperty('league_name', expect.any(String))
                expect(league).toHaveProperty('location', expect.any(String))
            })
         })
      })
    })
})
})