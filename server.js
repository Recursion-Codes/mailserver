const mysql = require('mysql');
const express = require('express');
const server = express();

const db = mysql.createConnection({
    user: `Wheel`,
    port: 3306,
    host: `DESKTOP-A8135BP`,
    password: `Gengu!123`,
    database: `aaa`,
});

server.use(express.json());

server.get("/", (req, res) => {
  res.send("does this work ? ? ?");
})

server.listen(5001, () => {
  console.log("does this work");
}) 