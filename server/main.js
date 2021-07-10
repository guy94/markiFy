var express = require("express");
var logger = require("morgan");
var axios = require("axios");
var cors = require("cors");
var mongoose = require("mongoose")
var app = express();

const corsConfig = {
    origin: true,
    credentials: true,
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

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

// const server = app.listen(port, () => {
//     console.log(`Server listen on port ${port}`);
// });

app.get("/alive", (req, res) => res.send("I'm alive"));