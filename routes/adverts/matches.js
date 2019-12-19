const express = require("express");
const router = express.Router();

const User = require("../../models/schemas/UserSchema");
const { Animal, Author } = require("../../models/schemas/AdvertSchema");
const FoundDogAdvertModel = require("../../models/FoundDogAdvertModel");
const LostDogAdvertModel = require("../../models/LostDogAdvertModel");

router.post("/lost", async function(req, res) {
  const lostDog = await LostDogAdvertModel.findById(req.body.id);
  const guesses = await FoundDogAdvertModel.find({
    "dogData.breed": lostDog.dogData.breed,
    "dogData.sex": lostDog.dogData.sex,
    "location.lat": {
      $gt: lostDog.location.lat - 0.03,
      $lt: lostDog.location.lat + 0.03
    },
    "location.lng": {
      $gt: lostDog.location.lng - 0.05,
      $lt: lostDog.location.lng + 0.05
    }
  });
  res.json(guesses);
});

router.post("/found", async function(req, res) {
  const foundDog = await FoundDogAdvertModel.findById(req.body.id);
  const guesses = await LostDogAdvertModel.find({
    "dogData.breed": foundDog.dogData.breed,
    "dogData.sex": foundDog.dogData.sex,
    "location.lat": {
      $gt: foundDog.location.lat - 0.03,
      $lt: foundDog.location.lat + 0.03
    },
    "location.lng": {
      $gt: foundDog.location.lng - 0.05,
      $lt: foundDog.location.lng + 0.05
    }
  });
  res.json(guesses);
});

module.exports = router;
