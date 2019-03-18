const { factory } = require('factory-girl');
const { Usuario } = require('../src/models');
const faker = require('faker');

factory.define('Usuario', Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password()
});

module.exports = factory;