const mysql = require('mysql');
const express = require('express');
const server = express();
const path = require("path") 
const cors = require('cors');
server.use(cors());
server.use(express.static(path.join(__dirname, 'build')))

const db = mysql.createConnection({
    user: `NightCitizen`,
    database: 'emails',
    host: `Server`,
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
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  res.send("does this work ? ? ?");
})

server.listen(5001, () => {
  console.log("does this work");
}) 



server.post("/login",(req,res)=>{
  if(req.body.username != null && req.body.password != null)
  {
      db.query("SELECT * FROM users WHERE username = ? AND password = ?", [req.body.username, req.body.password], (err, result) => {
          if(err)
          {
              console.log(err);
          } 

          if(result.length > 0)
          {
              res.send({success: true});
              server.get("/getEmails", (req, res) => {
                db.query(`SELECT * FROM emailmessages WHERE recipient = `+ req.body.username, (err, result)=>{
                    if(err)
                    {
                        console.log(err);
                    } 
                    else {
                        res.send(result);
                    }
              
                });
              })
          }
          else
          {
              res.send({success: false});
          }
        })
}})
