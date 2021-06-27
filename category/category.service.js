const db = require('../_helpers/db');
const Category = db.Category;

async function createCategory(params) {
    const category = new Category(params);
    return await category.save();
}
async function updateCategory(id, params) {
    return await Category.findOneAndUpdate({id}, { $set: params}, {new:true});
}
async function deleteCategory(_id){
    return await Category.deleteOne({ _id });
}
async function getCategory(id) {
    let _Category = await Category.findById(id);
    return _Category;
}
async function getAllCategories(){
    return await Category.find({}).populate('subCategories');
}
async function deleteAllCategories(){
    return await Category.remove({});
}
module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
    deleteAllCategories

};