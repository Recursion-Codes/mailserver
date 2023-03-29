const mysql = require('mysql');
const express = require('express');
const server = express();

const db = mysql.createConnection({
    user: `Wheel`,
    database: 'emails',
    host: `DESKTOP-A8135BP`,
    password: `Gengu!123`,
});

server.use(express.json());

db.query("SELECT * FROM emailmessages", (err, result)=>{
  if(err)
  {
      console.log(err);
  } 
  else {
      console.log(result);
  }
});

server.get("/", (req, res) => {
  res.send("does this work ? ? ?");
})

server.listen(5001, () => {
  console.log("does this work");
}) 

server.get("/getEmails OrWhateverURLYouWant", (req, res) => {
  db.query("SELECT * FROM emailmessages", (err, result)=>{
      if(err)
      {
          console.log(err);
      } 
      else {
          res.send(result);
      }
  });
})