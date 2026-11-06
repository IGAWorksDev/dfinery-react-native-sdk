const path = require('path');
const pak = require('../sdk/package.json');

module.exports = {
  dependencies: {
    [pak.name]: {
      root: path.join(__dirname, '..', 'sdk'),
    },
  },
};
