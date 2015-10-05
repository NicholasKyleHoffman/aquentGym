/** 
*	Express App
*	@author Nick Hoffman <hoffman.nick10@gmail.com>
**/

/** Require modules **/

var express = require("express")
//, ejs = require("ejs")
, jade = require("jade")
, fs = require("fs");

/* Initialize express app object */

var app = express();

/* Variables */
// Server will be browsed at http://localhost:4200
var root = __dirname   
   , port = 4200;

 /* Configure Express App */

app.use(express.static( root + "/public"));  

/** Configure views engine for express & jade **/
app.set("views", root + "/public/views" ); 

/** must toggle between jade or ejs here **/
app.set("view engine", "jade");

/** Add middleware that will look for data when requests are made **/

// app.use( express.urlencoded()); -- DEPRECATED & not working

// app.set("view engine", "ejs");

/** Create dynamic Express route for ejs & jade **/

// app.get("/ejs_test", function ejs_testCallback(req, res){
// 	res.render("test");

// app.get("/jade_test", function jade_testCallback(req, res){
//  	res.render("test");
// });

app.get("/settings/profile", function editProfileCallback(req, res){
 	res.render("profile-form");
});

// this callback is fired AFTER a post is sent to the server
app.post("/settings/profile", function postProfileCallback(req, res){

	// report to console

	console.log("Post received!");

	// report post data to console

// Node core file
// Asynchronously writes data to a file

fs.writeFile("data.json", JSON.stringify(req.body, null, 2), function writeCB (err) {

// error handling

if(err){
	res.json({ err: true, msg: err.msg });

	return console.log(err)
}

// report to ocnsole

console.log("Post data saved", req.body);



// reply to the browser with a redirective directive

 res.redirect("/profile");

 	});

 });

app.get("/profile", function profileCB(req, res){

	// When we render template files are are able to pass variables as options

	// Let's read the data from our JSON file (which isn't working - saving undefined data)

	fs.readFile("data.json", function readCallback(err, data){

		if(err){
			res.json({ err: true, msg: err.msg });

			return console.log(err)
		}

		// No error, continue to convert JSON string to JS object

		var profileData = JSON.parse (data);

		console.log("data read from file: ", data)
	});

 	res.render("profile", {
 		firstName: "Jason",
 		lastName: "Mackewitz",
 		bio: "This bio is hardcoded atm."
 	});
});

app.get("/profile", function profileCB(req, res){

	// When we render template files are are able to pass variables as options

	// Let's read the data from our JSON file (which isn't working - saving undefined data)

	fs.readFile("data.json", function readCallback(err, data){

		if(err){
			res.json({ err: true, msg: err.msg });

			return console.log(err)
		}

		// No error, continue to convert JSON string to JS object

		var profileData = JSON.parse (data);

		console.log("data read from file: ", profileData);
	});

 	res.render("profile", {
 		firstName: profileData.firstNameField,
 		lastName: profileData.lastNameField,
 		bio: profileData.bioField
 	});
});





// app.get("/hello", function helloCallback(req, res){
// 	res.send("Well hello, there");
// });

/** Demonstrating JSON GETting **/ 

app.get("/someJSON", function someJSONCallback(req, res){

	res.json({
		"one": {
			"description": "nifty JSON practice"
		},
		"two": "superb",
		"three": ["second JSON practice", "description", "gettng practical"]
	});

});

/** Setting up some basic HTML GETting **/

app.get("/beginning", function beginningCallback(req, res){
	res.send("<h1> This is just a beginning </h1><p> Beginning node routing - GET</p>");
})

// app.post();

 /* Start server on port 4200 */

 app.listen(port, function listenCallback () {
 	console.log("Express server listening on port: " + port); // + _dirName);
 	console.log("To test, browse to: http://localhost:" + port);
 });


 /* ADDED FROM run-npm-start/nodejs/app.js */

 var routes = require('./routes/index');