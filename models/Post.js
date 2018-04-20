const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  body: String,
  dateCreated: Date
});

mongoose.model("surveys", postSchema);
