const express = require('express');
const router = express.Router();
const categoryService = require('./category.service');

// routes
router.get('',getCategories);
router.get('/:id',getCategory);
router.post('', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);




function createCategory(req, res, next) {
    categoryService.createCategory(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}


function updateCategory(req, res, next) {
    categoryService.updateCategory(req.params.id, req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function deleteCategory(req,res,next){
    categoryService.deleteCategory(req.params.id).then((data)=>{res.json(data)}).catch(err=>next(err))
}
function getCategory(req,res,next){
    categoryService.getCategory(req.params.id).then((data)=>{res.json(data)}).catch(err=>next(err))
}

function getCategories (req,res,next){
    categoryService.getAllCategories().then((data)=>{res.json(data)}).catch(err=>next(err))
}

module.exports = router;