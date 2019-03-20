const mysql = require('mysql');
const loadJsonFile = require('load-json-file');

const data = {
  host: 'localhost',
  user: 'root',
  password: process.env.NODE_ENV === 'test' ? '' : process.env.NODE_ENV === 'dev' ? '' : '',
  database: process.env.NODE_ENV === 'test' ? 'intelligence_test' : process.env.NODE_ENV === 'dev' ? 'intelligence_dev' : 'intelligence_prod',
}

let mysql_connection = mysql.createConnection(data);

module.exports = mysql_connection;