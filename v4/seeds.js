var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    
        {name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3498/3905765143_446dcd0e2c.jpg",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."    
            
        },
        
        {name: "Big Sky", 
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."    
            
        },
        
        {name: "Carolina Beach", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."    
            
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
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground!")
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet!",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            
                                }
                                
                        });
                    }
                })
            });
            
            });
    
            
            
            
            //add a few comments
    
    
}

module.exports = seedDB;


