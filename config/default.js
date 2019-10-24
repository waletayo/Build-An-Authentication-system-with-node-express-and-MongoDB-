'use strict';
require('dotenv').config();
module.exports = {
    app: {
        name: "authenticationsystem",
        superSecret: "power",
        baseUrl: `http://localhost:`,
        port: process.env.PORT,
        expiresIn: 86400

    },

    api: {
        prefix: '^/api/v[1-9]',
        version: [1],

    },
    database: {
        url: process.env.DB_URL,

    }
};
