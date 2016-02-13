module.exports = function() {

  //Requring dependencies.
  const dotenv = require('dotenv').load();
  const Sequelize = require('sequelize');
  const mysql = require('mysql');

  //Initizling sequelize.
  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: { max: 5, min: 0, idle: 10000 }
  });

  sequelize.sync();
  return { connection: sequelize };
};
