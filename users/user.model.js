const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// {
//     "userName":"admin",
//     "password":"123",
//     "firstName":"admin",
//     "lastName":"admin"
// }


const schema = new Schema({
  userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: false },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    activites:[{type:Schema.Types.ObjectId,ref:'Activity'}],
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);