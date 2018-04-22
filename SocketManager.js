const mongoose = require("mongoose");
const { io } = require("./index");

const {} = require("./client/src/Events");
require("./models/Post");

const PostModel = mongoose.model("posts");

module.exports = async (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};
