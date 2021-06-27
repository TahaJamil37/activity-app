const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    categoryId:{type:Schema.Types.ObjectId, ref:'Category'},
    selected: Boolean
});

module.exports = mongoose.model('SubCategory', schema);