const { listingSchema } = require("./schema.js")
const ExpressError = require("./utils/expressError.js")
const { reviewSchema } = require("./schema.js")
const Listing = require("./models/listing.js")
const Review = require("./models/review.js")

module.exports.isLoggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl
    req.flash("error","Login to create listing")
    return res.redirect("/login")
    }
    next()
}

module.exports.saveredirecturl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
}


// Validation
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errmsg)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errmsg)
    } else {
        next()
    }
}

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params
    let listing =  await Listing.findById(id)
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not owner of this listing")
        return res.redirect(`/listings/${id}`)
    }
   next()
}


module.exports.isreviewAuthor = async(req,res,next) =>{
    let {id,review_id} = req.params
    let review =  await Review.findById(review_id)
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You did not created this review")
        return res.redirect(`/listings/${id}`)
    }
   next()
}