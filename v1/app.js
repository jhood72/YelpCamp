var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Mountain", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Green Valley", image: "https://farm8.staticflickr.com/7140/7873587008_0f9e2a3a9e.jpg"}
 
    
        
        ];


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    
        
        res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    res.send("You hit the post route on the campgrounds play!");
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server has Started!"); 
});