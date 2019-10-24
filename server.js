"use strict";
import express from "express";
import bodyParser from "body-parser";
import vm from "v-response";
import mongoose from "mongoose";
import config from "config";
import register_route from "./src/api/auth/register/register.route";
import login_route from "./src/api/auth/login/login.route";

const port = process.env.PORT || config.get("app.port");
const prefix = config.get("api.prefix");
const db = config.get("database.url");
const app = express();
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,x-api-key");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(prefix, register_route);
app.use(prefix, login_route);

mongoose.connect(db,{ useNewUrlParser: true } )
    .then(() => vm.log("connected to mongoDB", db))
    .catch(err => vm.log("error mongodb", err));
app.listen(port, vm.log("listing on port", port));



