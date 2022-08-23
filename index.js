require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const con = require("./config/dbconn");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

// middleWare
const cookieParser = require("cookie-parser");
// express app
const app = express();
const router = express.Router();
app.use(router, cors(), express.json());

app.set("Port", process.env.PORT);
app.use(express.static("view"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.listen(app.get("Port"), () => {
  console.log(`Server running on port ${app.get("Port")}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "public/index.html");
});

// monsters
router.get("/monsters", (req, res) => {
  const getAll = `
    select * from Monsters
    `;
  db.query(getAll, (err, results) => {
    if (err) throw err;
    res.json({
      status: 200,
      monsters: results,
    });
  });
});

// fetch posts
router.get("/users", (req, res) => {
  const getAll = "select * from Users";
  db.query =
    (getAll,
    (err, result) => {
      if (err) throw err;
      res.json({
        status: 200,
        users: results,
      });
    });
});

// fetch single post
router.get("/User/:id", (req, res) => {
  const getSingle = `select * from Monsters where id = ${req.params.id}`;

  db.query =
    (getSingle,
    (err, result) => {
      if (err) throw err;
      res.json({
        status: 200,
        user: results,
      });
    });
});

// register
router.post("/Users", bodyparser.json(), (req, res) => {
  const body = req.bodyconst;
  email = `
    select * from users where emailAdress =?
    `;

  let emailA = {
    emailAdress: body.emailAdress,
  };
  db.query(emailA, async (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({
        status: 400,
        msg: "This email already exists",
      });
    } else {
      let generateSalt = await bcrypt.genSalt();
      body.password = await bycrypt.hash(body.password, generateSalt);
      body.dateJoined = new Date().toISOString().slice(0, 10);

      const add = `
            insert into Users(userName, body.emaolAddress, phone_number, password,dateJoined) VALUES(?,?,?,?,?)
            `;
      db.query(
        add,
        [
          body.userName,
          body.fullName,
          body.emailAddress,
          body.phone_number,
          body.password,
          body.dateJoined,
        ],
        (err, results) => {
          if (err) throw err;
          res.json({
            status: 200,
            msg: "You have successfuly registered",
          });
        }
      );
    }
  });
});

//LOGIN
router.patch("/Users", bodyParser.json(), (req, res) => {
  const body = req.body;
  const login = `
        SELECT * FROM Users WHERE ?
    `;

  let email = {
    emailAddress: body.emailAddress,
  };
  db.query(login, email, async (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.json({
        status: 400,
        msg: "Email Not Found",
      });
    } else {
      if ((await bcrypt.compare(body.password, results[0].password)) == false) {
        res.json({
          status: 404,
          msg: "Password is Incorrect",
        });
      } else {
        const payload = {
          user: {
            userName: results[0].username,
            fullName: results[0].fullname,
            emailAddress: results[0].emailAddress,
            phone_number: results[0].phone_number,
            password: results[0].password,
            dateJoined: results[0].dateJoined,
          },
        };

        jwt.sign(
          payload,
          process.env.jwtsecret,
          { expiresIn: "10d" },
          (err, token) => {
            if (err) throw err;
            res.json({
              status: 200,
              user: results,
              token: token,
            });
          }
        );
      }
    }
  });
});

// update table
router.get("/Users/:id", bodyParser.json(), (req, res) => {
  const update = `
    update Users
    set username = ?, firstname = ?, lastname = ?, emailAddress =?,phone_number = ?,password = ?
    where userID=${req.params.id}
    `
    let generateSalt = await bcrypt.genSalt()
    body.password = await bcrypt.hash(body.password, generateSalt)
    db.query(edit, [body.userName, body.emailAddress, body.phone_number, body.password],(err, result)=>{
        if (err) throw err
        res.json({
            status: 204,
            msg: 'This user has been edited successfully'
        })
    })
});

// delete User

router.delete("/Users/:id", (req, res) => {
  const deleteUser = `delete from Users where where UserID = ${req.params.id};
    alter table Users auto_increment = 1;
    `;
  db.query(deleteUser, (err, result) => {
    if (err) throw err;
    res.json({
      status: 204,
      msg: "User has been removed from the database",
    });
  });
});