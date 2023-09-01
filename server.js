import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("Assets"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("index");
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);

  const memberSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    reg_no: {
      type: String,
      required: true,
      unique: true,
    },
    post: {
      type: String,
      required: true,
    },
  });

  const Member = mongoose.model("Member", memberSchema);

  Member.find().then((details) => {
    app.get("/about", function (req, res) {
      res.render("about", { members: details });
    });
  });
}

app.post("/report", async function (req, res) {
  cityName = req.body.cityName;
  var url = process.env.API + cityName + "&aqi=no";
  console.log(url);
  var cityName;
  var city;
  var country;
  var lastUpdated;
  var temp;
  var condition;
  var humidity;
  var clouds;
  var windSpeed;
  var feelsLike;
  var icon;
  var maxTemp;
  var minTemp;
  var averageTemp;
  var will_rain;
  var will_snow;
  var chanceOfRain;
  var chanceOfSnow;
  var sunRise;
  var sunSet;
  var moonRise;
  var moonSet;
  var moonPhase;

  axios
    .get(url)
    .then((response) => {
      const weatherData = response.data;

      city = weatherData.location.name;
      country = weatherData.location.country;
      lastUpdated = weatherData.current.last_updated;
      temp = weatherData.current.temp_c;
      condition = weatherData.current.condition.text;
      humidity = weatherData.current.humidity;
      clouds = weatherData.current.cloud;
      windSpeed = weatherData.current.wind_kph;
      feelsLike = weatherData.current.feelslike_c;
      icon = weatherData.current.condition.icon;
      maxTemp = weatherData.forecast.forecastday[0].day.maxtemp_c;
      minTemp = weatherData.forecast.forecastday[0].day.mintemp_c;
      averageTemp = weatherData.forecast.forecastday[0].day.avgtemp_c;
      will_rain = weatherData.forecast.forecastday[0].day.daily_will_it_rain;
      chanceOfRain =
        weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
      will_snow = weatherData.forecast.forecastday[0].day.daily_will_it_snow;
      chanceOfSnow =
        weatherData.forecast.forecastday[0].day.daily_chance_of_snow;
      sunRise = weatherData.forecast.forecastday[0].astro.sunrise;
      sunSet = weatherData.forecast.forecastday[0].astro.sunset;
      moonRise = weatherData.forecast.forecastday[0].astro.moonrise;
      moonSet = weatherData.forecast.forecastday[0].astro.moonset;
      moonPhase = weatherData.forecast.forecastday[0].astro.moon_phase;
      var hour = weatherData.forecast.forecastday[0].hour;

      if (will_rain == 1) {
        var willRain = "Yes";
      } else {
        willRain = "No";
      }

      if (will_snow == 1) {
        var willSnow = "Yes";
      } else {
        willSnow = "No";
      }

      res.render("report", {
        city: city,
        country: country,
        condition: condition,
        maxTemp: maxTemp,
        minTemp: minTemp,
        averageTemp: averageTemp,
        temp: temp,
        lastUpdate: lastUpdated,
        humidity: humidity,
        clouds: clouds,
        windSpeed: windSpeed,
        feelsLike: feelsLike,
        willRain: willRain,
        chanceOfRain: chanceOfRain,
        willSnow: willSnow,
        chanceOfSnow: chanceOfSnow,
        sunRise: sunRise,
        sunSet: sunSet,
        moonRise: moonRise,
        moonSet: moonSet,
        moonPhase: moonPhase,
        img: icon,
        hours: hour,
      });
    })
    .catch((error) => {
      console.log("Error " + error.message);
    });
});

app.listen(3000, function (res, req) {
  console.log("Server started at port 3000");
});
