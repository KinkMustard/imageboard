const express = require("express");

const app = express();
const server = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(server));
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
const SocketManager = require("./SocketManager");
require("./models/User");
require("./services/passport");
require("./models/Color");

const ColorModel = mongoose.model("colors");

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

io.on("connection", SocketManager);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});
