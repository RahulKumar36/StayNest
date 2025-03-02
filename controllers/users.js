const User = require("../models/user.js")

module.exports.renderSignupform = (req,res) =>{
    res.render("users/signup.ejs")
}

module.exports.renderLoginform = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.Signup = async (req, res) => {
    try {
        let { username, email, password } = req.body
        const newUser = new User({ username, email })
        let registeredUser = await User.register(newUser, password)
        // console.log(registeredUser)
        req.login(registeredUser, (err) => {
            if (err) {
                next(err)
            }
            req.flash("success", "Welcome to StayNest!")
            res.redirect("/listings")
        })

    } catch (error) {
        req.flash("error", error.message)
        res.redirect("/signup")
    }

}


module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome back to StayNest!")
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl)
}

module.exports.Logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(err)
        }
        req.flash("success", "you are logged out!")
        res.redirect("/listings")
    })
}