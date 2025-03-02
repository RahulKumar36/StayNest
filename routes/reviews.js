const express = require("express")
const router = express.Router({ mergeParams: true })
const wrapAsync = require("../utils/wrapAsync.js")
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const {validateReview, isLoggedin, isreviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


//post review
router.post("/",isLoggedin, validateReview, wrapAsync(reviewController.createReview))

//Delete review
router.delete("/:review_id",isLoggedin,isreviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports = router;