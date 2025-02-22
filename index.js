'use strict';

const shim = require('fabric-shim');
const { StockProductContract } = require('./stockproduct'); // Destructure the class from stockproduct.js

shim.start(new StockProductContract());