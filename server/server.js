const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/user");
var cors = require("cors");
const postSchema = require("./Models/post");

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


//---------------------------------
//gets budget from mongoose
//---------------------------------
app.get("/budget", (req, res, next ) => {
    postSchema.find({}).then((data) => {
      console.log("getting info from database")
        res.json(data);
        mongoose.connection.close();
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
