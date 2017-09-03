var api = module.exports = require('express').Router()
var controller = require('./controller')

api.get('/express-test', (req, res) => res.send({ express: 'working!' }))
api.use('/user', controller.user)

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
