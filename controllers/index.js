const ProjectController = require('./ProjectController')
const PostController = require('./PostController')
const JobController = require('./JobController')
const SchoolController = require('./SchoolController')
const ServiceController = require('./ServiceController')
const SubscriberController = require('./SubscriberController')

module.exports = {

	project: ProjectController,
    post: PostController,
    job: JobController,
    school: SchoolController,
    service: ServiceController,
    subscriber: SubscriberController

}
