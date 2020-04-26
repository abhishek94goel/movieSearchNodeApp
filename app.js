var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", 'ejs');

app.get("/", function(req,res){
    res.render("home");
});

app.get("/search", function(req,res){
    var searchField = req.query.movie;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchField;
    request(url, function(error,response,body){
        if(!error && response.statusCode==200){
            console.log(body);
            console.log(typeof body);
            var parsedContent = JSON.parse(body);
            console.log(typeof parsedContent);
            console.log(parsedContent["Search"]);
            res.render("movieSearchPage",{searchField:searchField,
                                          searchResults:parsedContent["Search"]});
        }
    });
});

app.get("*", function(req,res){
    res.send("<h1>Sorry. You are on the wrong page !</h1>");
});

app.listen(3000, function(){
    console.log("Server started at port number 3000");
});