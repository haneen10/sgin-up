//jShit esversion:6

//requiring express bodyparser , .. and initializing thecostant "app"
const bodyParser = require("body-parser");
const request = require ("request");
const express = require("express");
const https = require ("https");
const app =express();

//the public folder which holds the css and image
app.use (express.static("public"));
//using body-parser
app.use (bodyParser.urlencoded({extended:true}));

//sending the singnup.html file to the browser as soon as a request is made on localhost
app.get("/" , function (req,res) {
    res.sendFile(__dirname+"/signup.html")

});


// as soon as the signup buttom is pressed execute this
app.post("/",function (req , res){
    // change the cording to the values you have entered ...
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log("some dat======================="+firstName+" "+lastName+" "+ email);
    // creating an object with the users data
    const data={
        members:
        [
           {
                
            email_address :email,

            status :"subscribed",

            merge_fields: {
                FNAME : firstName,
                LNAME: lastName,
            }

           }
        ]
    }
   
    const jsonData = JSON.stringify(data);
       ///************Enter your list  AOi here */
    const url = "https://us1.api.mailchimp.com/3.0/lists/965e620d4c ";

    // enter your API key 
    const options ={
        method :"post",
        auth: "haneen:a724d21f57057a7b45892ffd91c9bd53-us1"
        // a724d21f57057a7b45892ffd91c9bd53-us1
    }

       //method for sending JSON data to mailchimp
    const request = https.request (url ,options , function (response){
        console.log("requestData4: "+ response.statusCode);
        if (response.statusCode == "200") {
            console.log("requestData43: "+ response.statusCode);
            res.sendFile(__dirname +"/success.html");
        }    else {
                    res.sendFile(__dirname +"/failure.html");
                }
    //adding success and failure pages
    // if (response.statuscode == "200"){
// console.log("hhhhhhhhhhhhh");
//         res.sendFile(__dirname +"/success.html");
        
//     } else {
//         res.sendFile(__dirname +"/failure.html");
//     }
       response.on ("data",function (data){
           console.log (JSON.parse(data))
       });

    });
     // colling req.write to send our data to mailchimp server
    request.write(jsonData);
    request.end();
});

app.post ("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000.");
}); 



//listening on port 3000 and if goes well then logging message saying that the server is running 



// api key mailchimp
//

//list id
//
