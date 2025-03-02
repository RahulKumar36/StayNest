const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user.js")
const { saveredirecturl } = require("../middleware.js")
const usersController = require("../controllers/users.js")

router
    .route("/signup")
    .get( usersController.renderSignupform)
    .post( usersController.Signup)

router
    .route("/login")
    .get(usersController.renderLoginform)
    .post( saveredirecturl, passport.authenticate
    ("local", { failureRedirect: "/login", failureFlash: true }),usersController.Login )

router.get("/logout", usersController.Logout)

module.exports = router;