const { seed } = require('./seed');
const db = require('../connection')

const runSeed = () => {
  return seed().then(() => {
    db.end();
  });
};

runSeed();

// const devData = require('../data/development-data/index.js');
// const seed = require('./seed.js');
// const db = require('../connection.js');

// const runSeed = () => {
//   return seed(devData).then(() => db.end());
// };

// runSeed();