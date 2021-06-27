const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    description: { type: String },
    date: { type: Date, default: Date.now },
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
    subCategoryIds: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }]
});

module.exports = mongoose.model('Activity', schema);