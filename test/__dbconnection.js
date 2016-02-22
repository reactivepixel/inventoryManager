const chai = require('chai');
const chaiHttp = require('chai-http');
const orders = require('../models/orders.js');
const should = chai.should();

chai.use(chaiHttp);
