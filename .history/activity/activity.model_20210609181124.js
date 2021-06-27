const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Activity', schema);