const request = require("request");

const forecast = function (latitude, longtitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=0737700425a54bc11dba152b23352a5c&query=${longtitude},${latitude}&units=m`;

  request({ url, json: true }, function (error, { body }) {
    if (error) {
      callback(`Unable to connect to MapBox Servers`, undefined);
    } else if (body.error) {
      callback(`unable to find location`, undefined);
    } else {
      callback(
        undefined,
        `It is currenlty ${body.current.temperature} degress out. There is ${body.current.precip}% chane of rain`
      );
    }
  });
};

module.exports = forecast;
