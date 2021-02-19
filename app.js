// Full Documentation - https://docs.turbo360.co
const express = require('express')
const path = require('path')
const controllers = require('./controllers')

const config = {
	views: 'views', 	// Set views directory
	static: 'public', 	// Set static assets directory
	logging: true,
	controllers: controllers,
}

const app = express()

vertex.configureApp(app, config)

app.use(vertex.setContext(process.env))

// import routes
const page = require('./routes/page')

// set routes
app.use('/', page)

module.exports = app
