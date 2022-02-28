const request = require("request");

const geocode = function (address, callback) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGF0cnlrMDMyMTIiLCJhIjoiY2t6ZnRxYzdsMHU2MzJubnk2emVtNjJrdyJ9.3GxYACfkYRteN1eo9JXtBQ`;

  request({ url, json: true }, function (error, { body }) {
    if (error) {
      callback(`Unable to connect to MapBox Servers`, undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location, Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longtitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
