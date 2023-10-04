const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");
const bodyParser = require("body-parser");

// Load Models
const { List, Task } = require("./db/models");

//Load Middleware
app.use(bodyParser.json());

//Enable CORS Headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* ROUTE HANDLERS */

/* LIST ROUTES */
app.get("/lists", (req, res) => {
  List.find()
    .then((lists) => {
      res.send(lists);
    })
    .catch((error) => {
      res.send(error);
    });
});

app.post("/lists", (req, res) => {
  // const title = req.body.title;
  let newList = new List({
    // title,
    ...req.body,
  });

  newList.save().then((listDoc) => {
    res.send(listDoc);
  });
});

app.patch("/lists/:id", (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:id", (req, res) => {
  List.findOneAndRemove({ _id: req.params.id }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

// Task Routes
app.get("/lists/:listId/tasks", (req, res) => {
  //Get all task from selected list
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.get("/tasks/:taskId", (req, res) => {
  Task.find({
    _id: req.params.taskId,
  }).then((taskDoc) => {
    res.send(taskDoc);
  });
});

app.post("/tasks", (req, res) => {
  let title = req.body.title;
  let _listId = req.body._listId;

  let newTask = new Task({ title, _listId });

  newTask.save().then((taskDoc) => {
    res.send(taskDoc);
  });
});

app.patch("/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
    },
    { $set: req.body }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
