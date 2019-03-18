const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.VIRTUAL,
      senha_hash: DataTypes.STRING,
    },
    {
      hooks: {
        beforeSave: async usuario => {
          if (usuario.senha) {
            usuario.senha_hash = await bcrypt.hash(usuario.senha, 10);
          }
        }
      }
    }

  );

  return Usuario;
}