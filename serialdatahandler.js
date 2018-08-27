var express = require('express');
var router = express.Router();
var db = require('../conf/db');

const io = require('socket.io-client');
var mysql = require('mysql');

const con = require('../config/db');

const connection = mysql.createConnection({
    host: con.connection.host,
    user: con.connection.user,
    password: con.connection.password,
    database: con.connection.database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to local database");
});

Establish websocket to orangepi host server. as a client
var socket = io.connect("http://192.168.35.68:3000/", {
    reconnection: true
});


//TODO DB Bind to Aws EC2 opensuse Mariadb
socket.on('connect', function () {
    console.log('connected to lan network port:3000');
    socket.on('serialdata', function (data) {

        //TEE DATAN KÄSITTELY
        var dataHandled = data.split(" ");
        console.log(dataHandled);
        var valo = parseInt(dataHandled[0]);
        var hum = parseFloat(dataHandled[1]);
        var lampo = parseFloat(dataHandled[2]);
        var kosteus = parseInt(dataHandled[3]);

        //Test insert with hard coded values
        //con.query("INSERT INTO sensor (id, light, humidity, temp, moisture) VALUES (0 , ?, ?, ?, ?)", [valo, hum, lampo, kosteus], (err) => {
          //  if (err) throw err;
       // });


    });
});


