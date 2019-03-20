
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const mysql_connection = require('../config/database/mysql_connection');

exports.get = async (req, res) => {
  const sql =
    'SELECT * FROM pessoas ';

  mysql_connection.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(500).json(error);
    }
    res.status(200).json(rows);
  });
};