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

// Root route for testing
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Attach routes
app.use('/applications', require('./applications'));
app.use('/tours', require('./tours'));
app.use('/alerts', require('./alerts'));
app.use('/stats', require('./stats'));
app.use('/users', require('./users'));
app.use('/locations', require('./locations'));
app.use('/settings', require('./settings'));
app.use('/ulb', require('./ulb'));

app.use(errorHandler);

// Export for Vercel
module.exports = serverless(app);
