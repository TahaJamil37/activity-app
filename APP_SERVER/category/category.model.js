const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    subCategories:[{type:Schema.Types.ObjectId,ref:'SubCategory'}],
    color: String
});

module.exports = mongoose.model('Category', schema);