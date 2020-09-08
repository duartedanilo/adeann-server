const routes = require('express').Router()

const AdeannController = require('./controllers/AdeannController')

routes.post('/adeann', AdeannController.store)
routes.get('/status/:username', AdeannController.status)

module.exports = routes;