const routes = require("express").Router();
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middlewares/auth')

routes.post("/", UsuarioController.post);
routes.post("/autenticacao", UsuarioController.auth);

routes.use(authMiddleware);
routes.put("/", UsuarioController.put);

module.exports = routes;
