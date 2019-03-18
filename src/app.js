const express = require("express");

class App{
  constructor(){
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.express.use(express.json());

    console.log("NODE_ENV TESTE " + process.env.NODE_ENV)
  }

  routes(){
    this.express.use('/usuarios', require("./routes/Usuarios"));
    this.express.use('/clientes', require("./routes/Clientes"));
  }
}

module.exports = new App().express;