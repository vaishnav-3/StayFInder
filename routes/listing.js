const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const {validateListing,isLoggedIn, isOwner} = require("../middleware.js")
const listingController = require("../controllers/listing.js")

const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const multer  = require('multer');

const {storage} = require("../cloudconflict.js");
const upload = multer({ storage })

router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post( isLoggedIn, upload.single('listing[image]') ,validateListing, wrapAsync( listingController.createlisting));

//index Route  


// create and  new route
router.get("/new" , isLoggedIn, wrapAsync(listingController.renderNewform));
 
//show route

router
    .route("/:id")
    .get(wrapAsync( listingController.showlistings))
    .put(upload.single('listing[image]') , isLoggedIn, isOwner,validateListing, wrapAsync(listingController.updatelisting))
    .delete( isLoggedIn,isOwner,  wrapAsync(listingController.destroylisting));

//create route


// edit route
router.get("/:id/edit" ,isLoggedIn,isOwner,  wrapAsync( listingController.editlisting))

//update rout
//delete route  

module.exports = router;   
