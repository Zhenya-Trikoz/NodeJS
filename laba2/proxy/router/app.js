require('dotenv').config();
const express = require('express');
const app = express();
var conf = require('../service/config.js');

app.get("/", (request, response) => {
    console.log(`redirect ${conf.get('url')}`)
    response.redirect(conf.get('url'));
});

module.exports = app;