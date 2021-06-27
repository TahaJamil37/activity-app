const config = require('../config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);

module.exports = {
    User: require('../users/user.model'),
    Activity:require('../activity/activity.model'),
    Category:require('../category/category.model'),
    SubCategory:require('../subCateogry/subCategory.model'),
};