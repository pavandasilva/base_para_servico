const { Usuario } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

// cadastro de usuário
exports.post = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Campo obrigátorio não informado" });
  }

  const usuario = await Usuario.create({ nome, email, senha });
  res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
};

// edição do usuário
exports.get = async (req, res) => {
  return res.status(201).json({txt: "clientes GET"});
};