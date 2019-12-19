const express = require("express");

const LostDogAdvertModel = require("../../models/LostDogAdvertModel");
const { Animal, Author } = require("../../models/schemas/AdvertSchema");
const User = require("../../models/schemas/UserSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await LostDogAdvertModel.getAll());
});

router.post("/", async (req, res) => {
  const user = await User.findById(req.body.advert.id);
  const { dogData, location } = req.body.advert;
  user.addLost(
    dogData.breed,
    dogData.description,
    dogData.sex,
    req.body.image,
    user.name,
    user.email,
    user.phoneNumber,
    user.adress,
    location
  );
  res.json({ message: "Объявление добавлено" });
});

router.get("/:id", async (req, res) => {
  const allFound = await LostDogAdvertModel.getAll();
  const response = allFound.find(advert => advert.id === req.params.id);
  res.json(response);
});

router.route("/update/:id").post((req, res) => {
  console.log(req.body);
  LostDogAdvertModel.findById(req.params.id)
    .then(dog => {
      dog.dogData.breed = req.body.breed;
      dog.dogData.description = req.body.description;
      dog.dogData.sex = req.body.sex;
      dog.dogData.date = req.body.date;
      // dog.location = req.body.location;

      dog
        .save()
        .then(() => res.json("Dog updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  LostDogAdvertModel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Dog deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
