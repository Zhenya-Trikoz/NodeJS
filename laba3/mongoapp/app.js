const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, client) {
        if (err) return console.log(err);
        dbClient = client;
        app.locals.collection = client.db("sitedb").collection("planets");
        app.listen(3000, function () {
                console.log("The server is waiting for a connection...");
        });
});

app.get("/api/planets", function (req, res) {

        const collection = req.app.locals.collection;
        collection.find({}).toArray(function (err, planets) {

                if (err) return console.log(err);
                res.send(planets)
        });

});


app.get("/api/planets/:id", function (req, res) {

        const id = new objectId(req.params.id);
        const collection = req.app.locals.collection;
        collection.findOne({ _id: id }, function (err, planet) {

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
       
        const planet = { name_system: nameSystem, count_planet: countPlanet, name_planet: namePlanet, order_planet: orderPlanet };

        const collection = req.app.locals.collection;
        collection.insertOne(planet, function (err, result) {

                if (err) return console.log(err);
                res.send(planet);
        });
});


app.delete("/api/planets/:id", function (req, res) {

        const id = new objectId(req.params.id);
        const collection = req.app.locals.collection;
        collection.findOneAndDelete({ _id: id }, function (err, result) {

                if (err) return console.log(err);
                let planet = result.value;
                res.send(planet);
        });
});

app.put("/api/planets", jsonParser, function (req, res) {

        if (!req.body) return res.sendStatus(400);
        const id = new objectId(req.body.id);
        const nameSystem = req.body.name_system;
        const countPlanet = req.body.count_planet;
        const namePlanet = req.body.name_planet;
        const orderPlanet = req.body.order_planet;
       

        const collection = req.app.locals.collection;
        collection.findOneAndUpdate({ _id: id }, { $set: { name_system: nameSystem, count_planet: countPlanet, name_planet: namePlanet, order_planet: orderPlanet } },
                { returnOriginal: false }, function (err, result) {

                        if (err) return console.log(err);
                        const planet = result.value;
                        res.send(planet);
                });
});

process.on("SIGINT", () => {
        dbClient.close();
        process.exit();
});