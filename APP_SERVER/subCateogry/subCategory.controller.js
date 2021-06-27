const express = require('express');
const router = express.Router();
const subCategoryService = require('./subCategory.service');

// routes
router.get('',getSubCategories);
router.get('/:id',getSubCategory);
router.post('', createSubCategory);
router.put('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);


module.exports = router;

function createSubCategory(req, res, next) {
    subCategoryService.createsubCategory(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}


function updateSubCategory(req, res, next) {
    subCategoryService.updatesubCategory(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function deleteSubCategory(req,res,next){
    subCategoryService.deletesubCategory(req.params.id).then((data)=>{res.json(data)}).catch(err=>next(err))
}
function getSubCategory(req,res,next){
    subCategoryService.getsubCategory(req.params.id).then((data)=>{res.json(data)}).catch(err=>next(err))
}

function getSubCategories (req,res,next){
    subCategoryService.getAllsubCategories().then((data)=>{res.json(data)}).catch(err=>next(err))
}