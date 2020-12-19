const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/user");
var cors = require("cors");
const postSchema = require("./Models/post");
const userSchema = require("./Models/user");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const user = require("./Models/user");
const checkAuth = require("./middleware/check-auth")

//-------------------
//middleware instance
//-------------------
app.use("/", express.static("public"));
app.use(cors());
app.use("/api/user", userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url = "mongodb+srv://jmc792:Papichojr1!@4166-cluster.gii5w.mongodb.net/personal_budget?retryWrites=true&w=majority"

//------------------
// Connects to mongo
//------------------
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
      console.log('connection failed')
  });

  //---------------------------
  //sign up user
  //----------------------
  app.post('/signup', (req,res, next) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      var addedUser = {
        email : req.body.email,
        password: req.body.password
      };
      console.log("connected to the database")
      console.log(addedUser)
      userSchema.insertMany(addedUser)
      .then((data) => {
        res.json(data);
      })
    })
    .catch((connectionError) => {
      console.log(connectionError)
    })
  });

  //---------------------------
  //verify user login
  //---------------------------
  app.post('/api/login', (req, res) => {
    let fetchedUser;
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then (() => {
      userSchema.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: " Auth Failed"
          })
        }
        fetchedUser- user ;
        return compare(req.body.password, userSchema.password)
      })
      .then(result => {
        if (!result){
          return res.status(401).json({
            message: "Auth Failed"
          })
        }
        const token = jwt.sign(
          {email: fetchedUser.email, userId: fetchedUser_id}, 
          'my-secret-key',
          {expiresIn: "1h"})
      })
      res.status(200).json({
        token: token
      })
    }).catch((connectionError)=> {
      console.log(connectionError)
    })
});

//---------------------------------
//gets budget from mongoose
//---------------------------------
app.get("/budget", checkAuth, (req, res, next ) => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    postSchema.find({}).then((data) => {
      console.log("getting info from database")
        res.json(data);
        mongoose.connection.close();
      })
  })
  .catch((connectionError) => {
    console.log(connectionError);
  });
})

//---------------------------------
//adds data to the database
//--------------------------------
app.post("/addBudget", checkAuth, (req, res) => {
  console.log(req.body);
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      var addedBudget = {
        id: req.body.id,
        name: req.body.name,
        budget: req.body.budget,
        color: req.body.color,
      };
      console.log(addedBudget);
      console.log("Connected to the database and created new budget");

      postSchema
        .insertMany(addedBudget)
        .then((data) => {
          res.json(data);
          mongoose.connection.close();
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log("Connection error in adding data");
    });
});

//----------------------------
//Where the listen port is at
//----------------------------
app.listen(port, () => {
  console.log(`Example app listen at http://localhost:${port}`);
});
