const mysql = require('mysql');
const express = require('express');
const server = express();

const db = mysql.createConnection({
    user: `aaa`,
    port: xyz,
    host: `aaa`,
    password: `aaa`,
    database: `aaa`,
});

server.use(express.json());

server.get("/", (req, res) => {
  res.send("does this work ? ? ?");
})

server.listen(5001, () => {
  console.log("does this work");
}) 