const db = require("../_helpers/db");
const Activity = db.Activity;
const User = db.User;
const mongoose = require('mongoose');


async function getActivityGrouped(userId, start, end) {
  let _start = new Date(new Date(start).setHours(0o0, 0o0, 0o0));
  let _end = new Date(new Date(end).setHours(23, 59, 59));
  let id = mongoose.Types.ObjectId(userId)
 
  let Activities = await Activity.aggregate([
    {
        "$match":{
        'userId': id,
        "date": {
            "$gte": _start, 
            "$lt": _end
        }
    }
  }
    ,
    {$unwind:'$subCategoryIds'},
    {
        $group: {
                    _id: '$subCategoryIds',
                    activities: { $push: "$$ROOT" },
                    count: { $sum: 1 },
        //         }},
        }
    }


])


  // console.log(userId,_start,_end);
  // const filter = { date: { $gte: _start, $lte: _end } };
  // let Activities = new Activity.find({
  //     userId: userId,
  //     $or: [{
  //         date: ""
  //     }, {
  //         date:{
  //         '$gte': _start,
  //         '$lt': _end
  //        }
  //     }]
  // });
  // let Activities = await Activity.aggregate(
  //     pipeline
  // {$unwind:'$subCategoryId'}
  // ,{$group: {
  //             _id: '$subCategoryId',
  //             activities: { $push: "$$ROOT" },
  //             count: { $sum: 1 },
  //         }},
  // ]
  // )
  // let Activities = await Activity.find({});
  return Activities;
}

module.exports = {
  getActivityGrouped,
};