// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const router = require("express").Router();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/api/login", passport.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({
    email: req.user.email,
    id: req.user.id
  });
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", (req, res) => {
  db.User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", (req, res) => {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});

// get all recipes of a user
router.get("/api/recipes", (req, res) => {
  db.Recipe.findAll({}).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// post a new recipe
router.post("/api/recipes", (req, res) => {
  db.Recipe.create({
    title: req.body.title,
    author: req.body.author,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  }).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

// search for a recipe by name
router.get("/api/recipes/:recipe", (req, res) => {
  db.Recipe.findAll({
    where: {
      title: req.params.recipe
    }
  }).then(dbRecipe => {
    res.json(dbRecipe);
  });
});

module.exports = router;
