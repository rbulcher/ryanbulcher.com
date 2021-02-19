const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

router.get('/', async (req, res) => {
	const data = req.context

	try {
		const serviceCtr = new controllers.service()
		data['services'] = await serviceCtr.get()

		const schoolsCtr = new controllers.school()
		data['schools'] = await schoolsCtr.get()

		const jobsCtr = new controllers.job()
		data['jobs'] = await jobsCtr.get()

		const projectsCtr = new controllers.project()
		data['projects'] = await projectsCtr.get()

		const postsCtr = new controllers.post()
		data['posts'] = await postsCtr.get()

		res.render('home', data)
	}
	catch(err){
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	}
})

router.get('/post/:slug', async (req, res) => {
	const data = req.context

	try {
		const postsCtr = new controllers.post()
		const posts = await postsCtr.get({slug:req.params.slug})

		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		data['post'] = posts[0]
		res.render('post', data)
	}
	catch(err){
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	}
})

module.exports = router
