var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var path = require("path");
var cors = require("cors");
var mongoose = require("mongoose")
var app = express();

/*
allow all origins to access the server
*/
const corsConfig = {
    origin: true,
    credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.static(path.join(__dirname, '../client/my-project/dist')));

const port = process.env.PORT || "3000";
var dbURI = "mongodb+srv://guy94:nubduehbd@cluster0.3bvbp.mongodb.net/guy94?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        const server = app.listen(port);
        console.log("connected to db...");
        console.log(`server started listening on port ${port}...`);
    })
    .catch((err) => console.log(err))

app.use(logger("dev"));
app.use(express.json());

var audio = require("./routes/audio");
app.use("/audio", audio);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.message);
  });


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/my-project/dist/index.html'));
  });
/*
testing route
*/
app.get("/alive", (req, res) => res.send("I'm alive"));