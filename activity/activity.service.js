const db = require('../_helpers/db');
const Activity = db.Activity;
const User = db.User


async function createActivity(params) {
    const activity = new Activity(params);
    let savedActivity = await activity.save();
    await User.findOneAndUpdate({_id:params.userId},{$push:{
        activites:savedActivity._id
    }});
    return savedActivity;
}
async function updateActivity(userId, id, params) {
    const activity = await Activity.findById(id);
    if(activity.userId == userId){
        const result = await Activity.findOneAndUpdate({_id: id}, { $set: params}, {new:true});
        return result;
    }
    throw "Not Allowed!"
}
async function deleteActivity(userId,_id){
    const activity = await Activity.findById(_id);
    if(activity.userId == userId){
        return await Activity.deleteOne({ _id });
    }
    throw "Not Allowed!"
}
async function getActivity(userId,startDate,endDate) {
    let _start = new Date(new Date(startDate).setHours(0o0, 0o0, 0o0));
    let _end = new Date(new Date(endDate).setHours(23, 59, 59));    
    let Activities = await Activity.find({
        date: {
            $gte: _start,
            $lt: _end
        },
        userId:userId
    }).sort({date_paid: 'asc'})
    return Activities;
}
async function getAllActivities(userId) {
    let Activities = await Activity.find({userId:userId});
    return Activities
}

module.exports = {
    createActivity,
    updateActivity,
    deleteActivity,
    getActivity,
    getAllActivities
};
