const subCategory = require("../subCateogry/subCategory.service");
const Activity = require("./activity.service");
let userId = "60c78330594e941f101f91ef";
let activities = [
  {
    description: "ACtivity 1",
    date: "2021-06-13T11:01:09.992Z",
    userId: userId,
    subCategoryIds: [
      "60c763ef833839ae7023552b",
      "60c763ef833839ae7023552c",
      "60c763ef833839ae7023552f",
    ],
  },
  {
    description: "ACtivity 2",
    date: "2021-06-13T11:01:09.992Z",
    userId: userId,
    subCategoryIds: [
      "60c763ef833839ae7023552f",
      "60c763ef833839ae70235530",
      "60c763ef833839ae70235531",
      "60c763ef833839ae7023552c",
    ],
  },
  {
    description: "ACtivity 3",
    date: "2021-06-14T11:01:09.992Z",
    userId: userId,
    subCategoryIds: ["60c763ef833839ae70235531", "60c763ef833839ae7023552f"],
  },
  {
    description: "ACtivity 4",
    date: "2021-06-14T11:01:09.992Z",
    userId: userId,
    subCategoryIds: [
      "60c763ef833839ae7023552f",
      "60c763ef833839ae70235531",
      "60c763ef833839ae70235530",
    ],
  },
  {
    description: "ACtivity 5",
    date: "2021-06-15T11:01:09.992Z",
    userId: userId,
    subCategoryIds: [
      "60c763ef833839ae7023552f",
      "60c763ef833839ae70235531",
      "60c763ef833839ae7023553a",
    ],
  },
  {
    description: "ACtivity 6",
    date: "2021-06-15T11:01:09.992Z",
    userId: userId,
    subCategoryIds: [
      "60c763ef833839ae70235531",
      "60c763ef833839ae7023553a",
      "60c763ef833839ae7023553d",
    ],
  },
];
subCategory.getAllsubCategories().then((data) => {
  let subCategories = data;
  if (subCategories.length >= 1) {
    for (let i = 0; i < activities.length; i++) {
      for (
        let j = 0;
        j < Math.floor(Math.random() * subCategories.length);
        j++
      ) {
        activities[i].subCategoryIds.push(subCategories[j]._id);
      }
      Activity.createActivity(activities[i])
        .then((addedData) => {
          console.log("Data Added", addedData);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  } else {
    console.log(
      "Please Enter Categories and Subcategories in the Database first"
    );
  }
});
