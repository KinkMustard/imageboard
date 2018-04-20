const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");

const keys = require("./config/keys");
require("./models/User");
require("./services/passport");
require("./models/Color");

const ColorModel = mongoose.model("colors");

mongoose.connect(keys.mongoURI);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());

io.on("connection", async (socket) => {
  console.log("New client connected");
  const updatedColor = await ColorModel.findById("5ad939425c092f2ad4798c6f");
  const temp = updatedColor.currentColor;
  console.log(temp);
  socket.emit("get color", temp);

  socket.on("change color", async (color) => {
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
    // const createColor = new ColorModel({
    //   currentColor: color
    // });
    // await createColor.save();
    ColorModel.findByIdAndUpdate(
      "5ad939425c092f2ad4798c6f",
      {
        currentColor: color
      },
      { upsert: true },
      () => {
        console.log("color updated");
      }
    );
    // await createColor.save();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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
