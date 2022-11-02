const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const {
        MONGO_DB_HOSTNAME,
        MONGO_DB_PORT,
        MONGO_DB
} = process.env

// const url = `mongodb://${MONGO_DB_HOSTNAME}:${MONGO_DB_PORT}/${MONGO_DB}`;

const url = "mongodb://172.31.0.1:27017/PlanetSite";

const planetScheme = new Schema({
        name_system: String,
        count_planet: Number,
        name_planet: String,
        order_planet: Number,
        size_planet: Number,
}, { versionKey: false });

const Planet = mongoose.model("Planet", planetScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect(url, function (err) {
        if (err) return console.log(err);
        app.listen(3000, function () {
                console.log("Сервер ожидает подключения...");
        });
});

app.get("/api/planets", function (req, res) {

        Planet.find({}, function (err, planets) {

                if (err) return console.log(err);
                res.send(planets)
        });
});

app.get("/api/planets/:id", function (req, res) {

        const id = req.params.id;
        Planet.findOne({ _id: id }, function (err, planet) {

                if (err) return console.log(err);
                res.send(planet);
        });
});

app.post("/api/planets", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);

        const nameSystem = req.body.name_system;
        const countPlanet = req.body.count_planet;
        const namePlanet = req.body.name_planet;
        const orderPlanet = req.body.order_planet;
        const sizePlanet = req.body.size_planet;

        const planet = new Planet({ name_system: nameSystem, count_planet: countPlanet, name_planet: namePlanet, order_planet: orderPlanet, size_planet: sizePlanet });

        planet.save(function (err) {
                if (err) return console.log(err);
                res.send(planet);
        });
});


app.delete("/api/planets/:id", function (req, res) {

        const id = req.params.id;
        Planet.findByIdAndDelete(id, function (err, planet) {

                if (err) return console.log(err);
                res.send(planet);
        });
});


app.put("/api/planets", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = req.body.id;
        const nameSystem = req.body.name_system;
        const countPlanet = req.body.count_planet;
        const namePlanet = req.body.name_planet;
        const orderPlanet = req.body.order_planet;
        const sizePlanet = req.body.size_planet;

        const newPlanet = { name_system: nameSystem, count_planet: countPlanet, name_planet: namePlanet, order_planet: orderPlanet, size_planet: sizePlanet };

        Planet.findOneAndUpdate({ _id: id }, newPlanet, { new: true }, function (err, planet) {
                if (err) return console.log(err);
                res.send(planet);
        });
});