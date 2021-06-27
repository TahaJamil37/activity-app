const express = require('express');
const router = express.Router();
const reportService = require('./reports.service');

// routes
router.get('',getActivityGrouped);


module.exports = router;

function getActivityGrouped(req,res,next){
    reportService.getActivityGrouped(req.userId,req.body.startDate,req.body.endDate).then((data)=>{res.json(data)}).catch(err=>next(err))
}
