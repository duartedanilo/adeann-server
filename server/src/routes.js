const routes = require('express').Router()
const multer = require('multer');
const multerConfig = require('./config/multer')

const AdeannController = require('./controllers/AdeannController')

routes.post('/adeann', multer(multerConfig).array('files', 2), AdeannController.storeWeb)
routes.get('/status/:username', AdeannController.status)
routes.get('/simulation/:username', AdeannController.simulation)

module.exports = routes;