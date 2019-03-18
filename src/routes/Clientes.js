const routes = require("express").Router();
const ClienteController = require('../controllers/ClienteController')

routes.get("/", ClienteController.get);
module.exports = routes;
