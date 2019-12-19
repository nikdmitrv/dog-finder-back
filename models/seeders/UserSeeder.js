const mongoose = require("mongoose");
const User = require('../schemas/UserSchema');

mongoose.connect("mongodb://localhost/pet-finder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
async function seedall() {
  let u1 = new User({
    name: "Maria",
    password: "m1",
    email: "m@m.ru",
    myAdverts: [],
  });
  await u1.save();

  let u2 = new User({
    name: "Nikita",
    password: "n2",
    email: "n@n.ru",
    myAdverts: [],
  });
  await u2.save();

  let u3 = new User({
    name: "Alexander",
    password: "a2",
    email: "a@a.ru",
    myAdverts: [],
  });
  await u3.save();

  let u4 = new User({
    name: "Denis",
    password: "d2",
    email: "d@d.ru",
    myAdverts: [],
  });
  await u4.save();

  let DogOne = await User.findOne({ name: "Maria" });
  await DogOne.addLost(
    "Чихуа",
    "Отличный пес",
    "так себе",
    "",
    "Maria",
    "Запись1",
    "Запись1",
    "Запись1",
    {lat:55.746631, lng:37.542166}
    
  );

  let DogTwo = await User.findOne({ name: "Maria" });
  await DogTwo.addFound(
    "Овчарки",
    "Умный пес",
    "Да",
    "",
    "Maria",
    "Запись2",
    "Запись2",
    "Запись2",
    {lat:55.624827, lng:37.397971}
  );

  let DogThree = await User.findOne({ name: "Nikita" });
  await DogThree.addLost(
    "Бульдог",
    "Отличный пес",
    "так себе",
    "",
    "Nikita",
    "Запись3",
    "Запись3",
    "Запись3",
    {lat:55.775281, lng:37.557273}
    
  );

  let DogFour = await User.findOne({ name: "Nikita" });
  await DogFour.addFound(
    "Дворняга",
    "Умный пес",
    "Да",
    "",
    "Nikita",
    "Запись4",
    "Запись4",
    "Запись4",
    {lat:55.672197, lng:37.705588}
  );
  let DogNull = await User.findOne({ name: "Nikita" });
  await DogNull.addFound(
    "ЧИх",
    "Умный пес",
    "Да",
    "",
    "Nikita",
    "Запись4",
    "Запись4",
    "Запись4",
    {lat:55.672197, lng:37.705588}
  );

  let DogFive = await User.findOne({ name: "Alexander" });
  await DogFive.addLost(
    "Хаски",
    "Отличный пес",
    "так себе",
    "",
    "Alexander",
    "Запись5",
    "Запись5",
    "Запись5",
    {lat:55.775270, lng:37.557270}
    
  );

  let DogSix = await User.findOne({ name: "Alexander" });
  await DogSix.addFound(
    "Шпиц",
    "Умный пес",
    "Да",
    "",
    "Alexander",
    "Запись6",
    "Запись6",
    "Запись6",
    {lat:55.837155, lng:37.757773}
  );
  //   mongoose.disconnect();
}
seedall();
