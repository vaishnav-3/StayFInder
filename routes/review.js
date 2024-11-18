const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js")
const Review = require("../models/review.js")
const {validateReview ,isLoggedIn ,isReviewAuthor}= require("../middleware.js")

const reviewController = require("../controllers/review.js")
     

//reviews
// post route
router.post("/", isLoggedIn, validateReview , wrapAsync(reviewController.createReview));

//Delete review route  use : because fro the dyanamic path
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);
module.exports = router; 