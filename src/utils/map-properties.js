const lodash = require("lodash");

function mapProperties(config) {
  return (data) => {
    if (data) {
      return Object.entries(data).reduce((acc, [key, value]) => {
        return lodash.set(acc, config[key] || key, value)
      }, {});
    }
    return data;
  };
}

module.exports = mapProperties;