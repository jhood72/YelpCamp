var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
    
    
seedDB(); 
mongoose.connect("mongodb://localhost:/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
 
 
 
 
//  Campground.create (
//      {
//          name: "Granite Mountain", 
//          image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
//          description: "This a huge granite mountain, no bathrooms. No water. Awesome views!"
            
//      },  function(err, campground) {
//          if(err) {
//              console.log(err);
//          } else {
//              console.log("Newly Created Campground: ");
//              console.log(campground);
//          }
//       });
 
 





app.get("/", function(req, res){
    res.render("landing");
});
//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
        //Get all campgrounds from db
        
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
                res.render("campgrounds/index", {campgrounds:allCampgrounds});
            }
        });
});
        
        
        //res.render("campgrounds", {campgrounds:campgrounds});

//CREATE ROUTE - add new campground
app.post("/campgrounds", function(req, res){
    res.send("You hit the post route on the campgrounds play!");
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //Create new campbround and aave to db
    Campground.create(newCampground, function(err, newlyCreated){
       if(err) {
           console.log(err);
       } else {
           res.redirect("/campgrounds");
       }
    });
    //redirect back to campgrounds page
    
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});


//=========================================
//      Comments Routes
//==========================================

app.get("/campgrounds/:id/comments/new", function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
           res.redirect("/campgrounds");
            
        }else {
            
            Comment.create(req.body.comment, function(err, comment) {
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //create new comment
    
    //connect new comment to campground
    
    //redirect campground show page
    
});



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has Started!"); 
});


//Broken, compare his source code to yours!!



 
 
   