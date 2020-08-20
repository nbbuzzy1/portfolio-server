const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');
const { SocketLabsClient } = require('@socketlabs/email');

const app = express()

// enable ssl redirect
app.use(sslRedirect());

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE, OPTIONS"
	);
	next();
});

app.post('/contact-me', (req, res, next) => {
	const { name, userEmail, message } = req.body;

	const client = new SocketLabsClient(parseInt(process.env.SGSERVERID), process.env.SGINJECTIONAPIKEY);

	const email = {
		to: 'nickbuzzy@gmail.com',
		from: userEmail,
		subject: `Portfolio Message from ${name}`,
		htmlBody:
			`<html>
				<div>${message}</div>
			</html>`,
		messageType: 'basic'
	};
	
	client.send(email).then(() => {
		//Handle success API call
		res.send()
		console.log('sent')
	}, (err) => {
		//Handle error making API call
		console.log('error', err)
	});
})

app.use("/", express.static(path.join(__dirname, "vue")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "vue", "index.html"));
});

module.exports = app;