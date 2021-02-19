// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const express = require('express')
const path = require('path')
const controllers = require('./controllers')

const config = {
	views: 'views', 	// Set views directory
	static: 'public', 	// Set static assets directory
	logging: true,
	controllers: controllers,
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
}

const app = express()

vertex.configureApp(app, config)

app.use(vertex.setContext(process.env))

// import routes
const page = require('./routes/page')

// set routes
app.use('/', page)

module.exports = app
