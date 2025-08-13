const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serverless = require('serverless-http');

const errorHandler = require('../middleware/errorHandler');
const dailyTourCheck = require('../jobs/dailyTourCheck');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

dailyTourCheck();

// Attach routes
app.use('/api/applications', require('./applications'));
app.use('/api/tours', require('./tours'));
app.use('/api/alerts', require('./alerts'));
app.use('/api/stats', require('./stats'));
app.use('/api/users', require('./users'));
app.use('/api/locations', require('./locations'));
app.use('/api/settings', require('./settings'));
app.use('/api/ulb', require('./ulb'));

app.use(errorHandler);

// Export for Vercel
module.exports = app;
