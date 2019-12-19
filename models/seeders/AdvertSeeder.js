const mongoose = require('mongoose');

const FoundDogAdvertModel = require('../FoundDogAdvertModel');
const LostDogAdvertModel = require('../LostDogAdvertModel');
const { Animal, Author } = require('../schemas/AdvertSchema')

mongoose.connect("mongodb://localhost/pet-finder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function seed(Model, data) {
    for (let item of data) {
        Model.create(item)
    }
}

const lostdata = [
    {
        dogData: new Animal('akita', 'very good boy', 'male'),
        authorData: new Author('Oleg', 'oleg@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('boxer', 'very nice boy', 'male'),
        authorData: new Author('Igor', 'igor@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('clumber', 'very cool boy', 'male'),
        authorData: new Author('Vasya', 'vasya@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('collie', 'very beautiful boy', 'male'),
        authorData: new Author('Grisha', 'grisha@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
];

const foundata = [
    {
        dogData: new Animal('chihuahua', 'very good girl', 'female'),
        authorData: new Author('Oleg', 'oleg@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('corgi', 'very nice girl', 'female'),
        authorData: new Author('Igor', 'igor@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('dalmatian', 'very cool girl', 'female'),
        authorData: new Author('Vasya', 'vasya@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
    {
        dogData: new Animal('dingo', 'very good girl', 'female'),
        authorData: new Author('Grisha', 'grisha@seed.js', '7-717-717-77-77'),
        createdAt: Date.now(),
    },
];

seed(FoundDogAdvertModel, foundata);
seed(LostDogAdvertModel, lostdata);
