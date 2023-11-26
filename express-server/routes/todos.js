const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo.js");
const User = require("../models/User.js");
// add an RSA KEY of 4096 key length as PRIVATE_KEY in a .env file before execution
const privateKey = process.env.PRIVATE_KEY;

// middleware for authorization check
router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "Authorization header missing!" });
  }
});

// create todo route
router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
  });
  return todo
    .save()
    .then(async (savedTodo) => {
      // updating user with ref of todo
      await User.findByIdAndUpdate(req.payload.id, {
        $push: {todos: savedTodo._id}
      })
      return res.status(201).json(savedTodo);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

// Read todos route
router.get("/", async function (req, res) {
  try {
  // populating user with todos and sending todos as response
  const userWithTodos = await User.findById(req.payload.id).populate('todos');
    if (userWithTodos) {
      res.status(200).json(userWithTodos.todos);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update todo route
router.put("/:id", async function (req, res) {
    Todo.findById()
        .where("_id")
        .equals(req.params.id)
        .then((todo) => {
          // Updating values after todo is found
          todo.isComplete = req.body.isComplete
          todo.dateCompleted = req.body.dateCompleted
          todo.save()
              .then((updatedTodo) => {
                return res.status(201).json(updatedTodo);
              })
              .catch((error) => {
                return res.status(500).json({ error: error.message });
              });
        })
        .catch((error) => {
          return res.status(400).json({ error: error.message })
        })
})

// Delete todo route
router.delete("/:id", async function (req, res) {
    Todo.findByIdAndDelete()
        .where("_id")
        .equals(req.params.id)
        .then(async (deletedTodo) => {
          // After todo deletion from Todo collection, removing todo ref id from User
          await User.findById(req.payload.id).then(user => {
            user.todos = user.todos.filter(todo => !todo.equals(deletedTodo._id))
            user.save()
          })
            return res.status(200).json(deletedTodo)
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message })
        })
});

module.exports = router;
