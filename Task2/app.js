// Import the Express Module
const express = require("express");

// Create the instance of express app
const app = express();

// Import the path to work with files and directories path
const path = require("path");

// Middleware to parse url-encoded data
app.use(express.urlencoded({extended: true}));

// Set the view engine to EJS
app.set("view engine","ejs");

// Set the views directory to the current directory
app.set("views",path.join(__dirname, "/views"));

// Set the static files directory to current directory
app.use(express.static(path.join(__dirname, "/public")));

// Import the uuid PAckage for creating unique id
const {v4 : uuidv4} = require("uuid");

// Import the method-override Package for converting requests
var methodOverride = require("method-override");

// Middleware that tells express to use method-override package
app.use(methodOverride('_method'));

// Dummy Data for Instagram Post
let instaposts = [
    {
        Id : uuidv4(),
        Username: "@Virat Kholi",
        Image : "/images/img1.webp",
        Caption : "Be yourself, be unique, and be the best version of you.",
        Followers : 24000000,
        Following : 500
    },
        {
        Id : uuidv4(),
        Username: "@Rohit Sharma",
        Image : "/images/img2.webp",
        Caption : "When days get tough, remember you are tougher.",
        Followers : 12000000,
        Following : 5000
    },
        {
        Id : uuidv4(),
        Username: "@Shreyas Iyer",
        Image : "/images/img3.webp",
        Caption : "Life becomes better when you surround yourself with the best vibes.",
        Followers : 1000000,
        Following : 20000
    }
];

// API For Rendering Index page with the list of intagram posts
app.get("/post",(req,res)=>{
    res.render("index.ejs",{instaposts});
});

// API for Rendering Form that used to Create new Insta post
app.get("/post/new",(req,res)=>{
    res.render("new.ejs");
});

// APi For Creating New Insta Posts Using Form data comes from form by get request
app.post("/post",(req,res)=>{
    let {
        Username,
        Image,
        Caption,
        Followers,
        Following
    } = req.body;
    instaposts.push({
        Id : uuidv4(),
        Username,
        Image,
        Caption,
        Followers,
        Following
    });
    res.redirect("/post");
});

// API For Showing Insta Feed In Detail Using their Id
app.get("/post/:id",(req,res)=>{
    const id = req.params.id;
    const post = instaposts.find((post)=>{
        return post.Id === id;
    });
    res.render("show.ejs",{ post });
});

// API For Updating Existing Post using form data That comes from Form by get request
app.patch("/post/:id",(req,res)=>{
    let id = req.params.id;
    let newCaption = req.body.Caption;
    let post = instaposts.find((post)=>{
        return post.Id === id;
    });
    post.Caption = newCaption;
    res.redirect("/post");
});

// API for Rendering Form used to Update post
app.get("/post/:id/edit",(req,res)=>{
    let id = req.params.id;
    let post = instaposts.find((post)=>{
        return post.Id === id;
    });
    res.render("edit.ejs",{post});
});

// API for Deleting Instagram Feed
app.delete("/post/:id",(req,res)=>{
    let id = req.params.id;
    instaposts = instaposts.filter((post)=>{
        return post.Id !== id;
    });
    res.redirect("/post");
})

// Start the express server
app.listen(5000,()=>{
    console.log("Server running on port 5000");
});