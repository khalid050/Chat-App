const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { connect, options } = require("./mongodb/db.config");
const userRouter = require("./routes/user.routes");

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("dist"));
app.use(userRouter);

mongoose.connection.on("connected", function () {
  console.log("connection established successfully");
});

const port = process.env.PORT || 3000;
const startApp = async () => {
  try {
    await connect(process.env.mongodbURI, options);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.log(err);
    console.log("Unable to start server");
  }
};


module.exports = { startApp, app };
