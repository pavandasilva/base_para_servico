const truncate = require('../utils/truncate');
const factory = require('../factories')
const bcrypt = require('bcrypt');

beforeEach(async () => {
  await truncate()
});

it("Deve criptografar a senha do usuário", async () => {
  const usuario = await factory.create('Usuario');
  expect(await bcrypt.compare(usuario.senha, usuario.senha_hash)).toBe(true);
});