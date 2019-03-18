const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');
const faker = require('faker');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../src/config/jwtConfig');

describe('Cadastro de usuário', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('Deve cadastrar um novo usuário e retornar seus dados', async () => {
    const response = await request(app).post("/usuarios").send({
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
    });

    const { id, nome, email } = response.body;
    const status = response.status;
    const countFields = Object.values(response.body).length;

    expect(status).toBe(201);
    expect(countFields).toBe(3);
    expect(typeof id).toBe('number');
    expect(typeof nome).toBe('string');
    expect(typeof email).toBe('string');
  });

  it('Deve retornar erro 400 quando não informado o nome', async () => {
    const response = await request(app).post("/usuarios").send({
      nome: '',
      email: faker.internet.email(),
      senha: faker.internet.password(),
    });

    const status = response.status;
    expect(status).toBe(400);
  });

  it('Deve retornar erro 400 quando não informado o email', async () => {
    const response = await request(app).post("/usuarios").send({
      nome: faker.name.findName(),
      senha: faker.internet.password(),
    });

    const status = response.status;
    expect(status).toBe(400);
  });

  it('Deve retornar erro 400 quando não informado a senha', async () => {
    const response = await request(app).post("/usuarios").send({
      nome: faker.name.findName(),
      email: faker.internet.email(),
    });

    const status = response.status;
    expect(status).toBe(400);
  });

});

describe('Autenticação de usuário', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('Deve autenticar o usuário e retornar um token', async () => {
    const usuario = await factory.create('Usuario');

    const response = await request(app).post("/usuarios/autenticacao").send({
      email: usuario.email,
      senha: usuario.senha
    });

    expect(response.status).toBe(200);
    expect(Object.values(response.body).length).toBe(6);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("nome");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("token");
  });

  it('Deve retornar erro 401 quando o email informado não está cadastrado', async () => {
    const usuario = await factory.create('Usuario');

    const response = await request(app).post("/usuarios/autenticacao").send({
      email: 'rogerio@email.com',
      senha: usuario.senha
    });

    expect(response.status).toBe(401);
  });

  it('Deve retornar erro 401 quando a senha informada estiver incorreta', async () => {
    const usuario = await factory.create('Usuario');

    const response = await request(app).post("/usuarios/autenticacao").send({
      email: usuario.email,
      senha: 'rogerio@email.com'
    });

    expect(response.status).toBe(401);
  });

  it('Deve retornar erro 401 quando não informado o email', async () => {
    const response = await request(app).post("/usuarios/autenticacao").send({
      senha: '1234'
    });

    expect(response.status).toBe(401);
  });

  it('Deve retornar erro 401 quando a senha não for informada', async () => {
    const response = await request(app).post("/usuarios/autenticacao").send({
      email: 'rogerio@email.com',
    });

    expect(response.status).toBe(401);
  });
});


describe('Edição de usuário', () => {
  beforeEach(async () => {
    await truncate()
  });

  it('Deve retornar 401 quando não informado o token', async () => {
    const response = await request(app).put("/usuarios");
    expect(response.status).toBe(401);
  });

  it('Deve retornar 401 quando o token informado está errado', async () => {
    const response = await request(app).put("/usuarios").set("Authorization", "Bearer ");
    expect(response.status).toBe(401);
  });

  it('Deve retornar 400 quando não informar nenhum campo', async () => {
    const usuario = await factory.create('Usuario');
    const token = await jwt.sign({ id: usuario.id }, jwtConfig.secret);

    const response = await request(app).put("/usuarios").set("Authorization", "Bearer " + token)
    expect(response.status).toBe(400);
  });

  it('Deve retornar 401 quando o token é de outro usuário', async () => {
    const usuario = await factory.create('Usuario');

    const token = await jwt.sign({ id: usuario.id }, jwtConfig.secret);
    const response = await request(app).put("/usuarios").set("Authorization", "Bearer " + token).send({
      id: 20,
      nome: faker.name.findName(),
      email: faker.internet.email(),
      senha: faker.internet.password(),
    })
    expect(response.status).toBe(401);
  })
});




