const routes = require("express").Router();
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middlewares/auth')

routes.get("/", UsuarioController.get);

module.exports = routes;
