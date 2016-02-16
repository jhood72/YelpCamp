var mongoose = require("mongoose");

var Campground = require("./models/campground");

var data = [
    
        {name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3498/3905765143_446dcd0e2c.jpg",
        description: "blah blah blah"    
            
        },
        
        {name: "Big Sky", 
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: "blah blah blah"    
            
        },
        
        {name: "Carolina Beach", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "blah blah blah"    
            
        }
    
    ]

function seedDB() {
    //REmove all campgrounds
            Campground.remove({}, function(err){
                if(err){
                    console.log(err);
                }
            
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, data){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground!")
                    }
                })
            });
            
            });
    
            
            
            
            //add a few comments
    
    
}

module.exports = seedDB;


