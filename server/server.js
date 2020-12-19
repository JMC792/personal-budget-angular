const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/user");
var cors = require("cors");
const postSchema = require("./Models/post");
const userSchema = require("./Models/user");

//-------------------
//middleware instance
//-------------------
app.use("/", express.static("public"));
app.use(cors());
app.use("/api/user", userRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url = "mongodb://localhost:27017/personal_budget";

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
    const { username, password } = req.body;
    
    for(let user of users){
        if(username == user.username && password == user.password){
            let token = jwt.sign({ id: user.id, username: user.username}, secretKey, { expiresIn: '7d'});
            res.json({
                success: true,
                err: null,
                token
            });
            break;
        }
        else{
            res.status(401).json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

//---------------------------------
//gets budget from mongoose
//---------------------------------
app.get("/budget", (req, res, next ) => {
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
app.post("/addBudget", (req, res) => {
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
