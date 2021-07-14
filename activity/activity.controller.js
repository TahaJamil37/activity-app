const express = require('express');
const router = express.Router();
const activityService = require('./activity.service');

// routes
router.get('',getActivities);
router.get('/all',getAllActivities);
router.post('', createActivity);
router.put('/', updateActivity);
router.delete('/', deleteActivity);

function createActivity(req, res, next) {
    req.body.userId = req.userId;
    activityService.createActivity(req.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}


function updateActivity(req, res, next) {
    activityService.updateActivity(req.userId,req.body.id, req.body.body)
        .then((data) => res.json(data))
        .catch(err => next(err));
}

function deleteActivity(req,res,next){
    activityService.deleteActivity(req.query.userId,req.query.id).then((data)=>{res.json(data)}).catch(err=>next(err))
}
function getActivities(req,res,next){
    activityService.getActivity(req.query.userId,req.query.startDate,req.query.endDate).then((data)=>{res.json(data)}).catch(err=>next(err))
}
function getAllActivities(req,res,next){
    activityService.getAllActivities(req.userId).then((data)=>{res.json(data)}).catch(err=>next(err))
}

module.exports = router;