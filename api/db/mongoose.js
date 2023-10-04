// DB Connection to Mongodb

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/TaskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB");
    console.log(e);
  });

// mongoose.set("useCreateIndex", true);
// mongoose.set("useFindAndModify", false);

module.exports = {
  mongoose,
};
