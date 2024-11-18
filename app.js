if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}



const express = require("express");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const session = require("express-session")

// Route imports
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const flash = require("connect-flash")
const passport = require("passport");
const LocalStratergy = require("passport-local");
const User = require("./models/user.js");

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));


// MongoDB connection

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust", )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

const sessionOptions = {
    secret : "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly :true,
    },
};
// Root route
app.get("/", (req, res) => {
    res.send("Hi, I am Root");
});


app.use(session(sessionOptions));
app.use(flash());


// middle for the passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // strring the user related info in session 
passport.deserializeUser(User.deserializeUser());
// remove the user related info from the session
//middle ware for flash
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// demouser
// app.get("/demouser" ,async(req,res) =>{
//     let fakeUser = new User({
//         email :"student@gmail.com",
//         username:"delta-student"
//     });

//      let registeruser = await User.register(fakeUser,"helloworld");
//      res.send(registeruser)
// })

// Use routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// 404 handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Error handler
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// Server start
app.listen(8080, '0.0.0.0', () => {
    console.log("Server is listening on port 8080");
});























































































// const express = require("express");
// const app = express();
// const wrapAsync = require("./utils/wrapAsync.js")

// const mongoose = require("mongoose");


// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate")

// const ExpressError = require("./utils/ExpressError.js") 


// const listings =require("./routes/listing.js");
// const reviews =require("./routes/review.js");


// app.set("view engine" ,"ejs");
// app.set("views" ,path.join(__dirname ,"views"));
// app.use(express.urlencoded({extended:true}));
// app.use(methodOverride("_method"));
// app.engine("ejs",ejsMate)
// app.use(express.static(path.join(__dirname,"Public")))

// main().then(() =>{
//     console.log("connected to db");
// }).catch((err)=>{
//     console.log(err);
// });

// async function  main() {
//     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    
// }

// app.get("/" , (req,res)=>{
//     res.send("Hi am Root")
// });


// app.use("/listings" , listings);

// app.use("/listings/:id/reviews" , reviews)


// app.all("*" , (req,res,next) =>{
//     next (new ExpressError (404,"page not found!"));
// });

// app.use((err,req,res, next) =>{
//     let {statusCode =500 , message ="Something went wrong"} = err;
//     res.status(statusCode).render("error.ejs", {message})

// }); 
// app.listen(8080, '0.0.0.0' ,() =>{
//     console.log("server is listening to port 8080");
// });






// // app.get("/testListing" , async (req,res) =>{
// //     let samplelisting = new Listing ({
// //         title:"My new Vila",
// //         description:"By the beach",
// //         price:1200,
// //         location:"Calangute goa",
// //         country:"India",
// //     });
// //     await samplelisting.save()
// //     console.log("sample was saved");
// //     res.send("sample was tested");
// // });
