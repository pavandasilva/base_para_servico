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
exports.put = async (req, res) => {
  const { id, nome, email, senha } = req.body;

  if ((!nome && !email && !senha) || !id)
    return res.status(400).json({ error: "Você não enviou os campos obrigatórios" });

  if (id !== req.id)
    return res.status(401).json({ error: "Você não tem autorização para alterar estes dados" });

  res.status(201).send();
};

// autenticação de usuário
exports.auth = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha)
    return res.status(401).json({ error: "Email e senha são campos obrigatórios" });

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario)
    return res.status(401).json({ error: "Usuário não encontrado" });

  if (!(await bcrypt.compare(senha, usuario.senha_hash)))
    return res.status(401).json({ error: "Senha inválida" });

  const token = await jwt.sign({ id: usuario.id }, jwtConfig.secret);

  return res.status(200).json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
    token
  });
};