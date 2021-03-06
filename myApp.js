
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const indexFile = __dirname + '/views/index.html';
const staticFile = __dirname + '/public';

require('dotenv').config();

/** 4) Serve static assets  */
app.use(express.static(staticFile));

// to handle urlencoded data
/** Note:
extended=false is a configuration option that tells the parser to use the classic encoding.
When using it, values can be only strings or arrays.
The extended version allows more data flexibility, but it is outmatched by JSON.
*/
app.use(bodyParser.urlencoded({extended: false}));


// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
	let logMethod = req.method;
	let logPath = req.path;
	let logIp = req.ip;
	console.log(`${logMethod} ${logPath} - ${logIp}`);
	next();
});

// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get('/', (req, res) => {
// 	res.send("Hello Express");
// });

/** 3) Serve an HTML file */
app.get('/', (req, res) => {
	res.sendFile(indexFile);
});


/** 5) serve JSON on a specific route */
// app.get('/json', (req, res) => {
// 	res.json({ "message": "Hello json" });
// });

/** 6) Use the .env file to configure the app */
let messageObject = {"message": "Hello json"};

app.get('/json', (req, res) => {
	if (process.env.MESSAGE_STYLE === 'uppercase') {
		let data = JSON.parse(JSON.stringify(messageObject));
		data.message = data.message.toUpperCase();
		return res.json(data);
	} else {
		return res.json(messageObject);
	}
});
 
/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
	req.time = new Date().toString();
	next();
}, (req, res) => {
	res.json({ "time": req.time });
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
	res.json({ "echo": req.params.word })
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get((req, res) => {
	let firstname = req.query.first;
	let lastname = req.query.last;
	res.json({ "name": `${firstname} ${lastname}` });
}).post((req, res) => {
	let firstname = req.body.first;
	let lastname = req.body.last;
	res.json({ "name": `${firstname} ${lastname}` });
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
