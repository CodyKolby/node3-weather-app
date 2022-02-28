const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Paths
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebares engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", function (req, res) {
  res.render(`index`, {
    title: `Weather App`,
    creator: "created by Dominik Kolber",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    title: "About",
    creator: "created by Dominik Kolber",
  });
});

app.get("/help", function (req, res) {
  res.render("help", {
    helpText: "Jeśli to czytasz jesteś żywą legendą i nie potrzebujesz pomocy",
    title: "Help",
    creator: "created by Dominik Kolber",
  });
});

app.get("/weather", function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: `You must provide a search term`,
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `You must provide a search term`,
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("page404", {
    errorMessage: "Not help page found",
  });
});

app.get("*", (req, res) => {
  res.render("page404", {
    errorMessage: "Page not found",
  });
});

app.listen(3000, function () {
  console.log("Server is up on port 3000");
});
