require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const config = require('./config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/activity', require('./activity/activity.controller'));
app.use('/category', require('./category/category.controller'));
app.use('/subCategory', require('./subCateogry/subCategory.controller'));
app.use('/reports', require('./reports/reports.controller'));

// global error handler
app.use(errorHandler);

// start server
//process.env.PORT : This will be useds when we are deploying it to hroku...if you rin it locally, 
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
