var convict = require('convict');

convict.addFormat(require('convict-format-with-validator').url);

// Define a schema
var conf = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 3001,
        env: "PORT_API_2"
    },
    url: {
        format: "url",
        default: 'http://localhost:3000/',
        env: "URL_API_1"
    }
});

var env = conf.get('env');

conf.loadFile('../config/' + env + '.json');

conf.validate();

module.exports = conf;