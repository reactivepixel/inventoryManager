module.exports = function() {
  const express = require('express');
  const dotenv = require('dotenv').load();
  const Sqlize = require('sequelize');
  const mysql = require('mysql');

  const sqlize = new Sqlize(process.env.DB_NAME, process.env.DB_USER,
  process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
    pool: { max: 5, min: 0, idle: 10000 }
  });

  sqlize.sync();
  console.log("I think it works?");
};
