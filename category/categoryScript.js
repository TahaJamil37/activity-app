const controller = require("./category.service");
const subController = require("../subCateogry/subCategory.service");
controller
  .deleteAllCategories()
  .then(() => {
    subController
      .deleteAllSubCategories()
      .then(() => {
        const data = [
          {
            title: "Self Actualization",
            subCategories: ["Self Actualization"],
            color: "#C6C6C6"
          },
          {
            title: "Esteem",
            color: "#D7A5D2",
            subCategories: [
              "Self-Esteem",
              "Recognition",
              "Freedom",
              "Status",
              "Strength",
            ],
          },
          {
            title: "Love and Belonging",
            color: "#FFAF2F",
            subCategories: ["FriendShip", "Family", "Intimacy", "Connections"],
          },
          {
            title: "Safety",
            color: "#55C2BB",
            subCategories: [
              "Security",
              "Employment",
              "Resources",
              "Health",
              "Property",
            ],
          },
          {
            title: "Physiological",
            color: "#5DAEFF",
            subCategories: [
              "Air",
              "Water",
              "Food",
              "Sleep",
              "Clothing",
              "Shelter",
              "Reproduction",
            ],
          },
        ];
        for (let i = 0; i < data.length; i++) {
          console.log(data[i]);
          controller
            .createCategory({ title: data[i].title, subCategories: [], color: data[i].color })
            .then((data_) => {
              for (let j = 0; j < data[i].subCategories.length; j++) {
                subController
                  .createsubCategory({
                    title: data[i].subCategories[j],
                    categoryId: data_._id,
                    selected: false
                  })
                  .then((subdata) => {
                    console.log("SubCategory", subdata);
                  })
                  .catch((err) => {
                    console.log("Error Sub:", err);
                  });
              }
            })
            .catch((err) => console.log("Error", err));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
