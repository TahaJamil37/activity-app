const db = require('../_helpers/db');
const subCategory = db.SubCategory;
const Category = db.Category;

async function createsubCategory(params) {
    const subcategory = new subCategory(params);
    let savedSubCategory = await subcategory.save();
    await Category.findOneAndUpdate({ _id: params.categoryId }, {
        $push: {
            subCategories: savedSubCategory._id
        }
    })
    return savedSubCategory
}
async function updatesubCategory(id, userParam) {
    return await subCategory.findOneAndUpdate({ id }, { $set: userParam }, { new: true });
}
async function deletesubCategory(_id) {
    return await subCategory.deleteOne({ _id });
}
async function getsubCategory(id) {
    let _subCategory = await subCategory.findById(id);
    return _subCategory;
}
async function getAllsubCategories() {
    return await subCategory.find({}).populate('categoryId');
}
async function deleteAllSubCategories() {
    return await subCategory.remove({})
}
module.exports = {
    createsubCategory,
    updatesubCategory,
    deletesubCategory,
    getsubCategory,
    getAllsubCategories,
    deleteAllSubCategories

};