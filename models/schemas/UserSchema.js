const mongoose = require("mongoose");
const Found = require("../FoundDogAdvertModel");
const Lost = require("../LostDogAdvertModel");
const { ObjectId } = mongoose.Schema.Types;
const { Animal, Author } = require("../schemas/AdvertSchema");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  myLost: [{ type: ObjectId, ref: "LostDogAdvert" }],
  myFound: [{ type: ObjectId, ref: "FoundDogAdvert" }]
});

userSchema.methods.addLost = async function(
  breed,
  description,
  sex,
  image,
  name,
  email,
  phoneNumber,
  adress,
  location
) {
  let lostGenereted = new Lost({
    dogData: new Animal(breed, description, sex, image),
    authorData: new Author(name, email, phoneNumber, adress),
    location,
    createdAt: Date.now()
  });
  this.myLost.push(lostGenereted);
  await lostGenereted.save();
  await this.save();
};
userSchema.methods.addFound = async function(
  breed,
  description,
  sex,
  image,
  name,
  email,
  phoneNumber,
  adress,
  location
) {
  let foundGenereted = new Found({
    dogData: new Animal(breed, description, sex, image),
    authorData: new Author(name, email, phoneNumber, adress),
    location,
    createdAt: Date.now()
  });
  this.myFound.push(foundGenereted);
  await foundGenereted.save();
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
