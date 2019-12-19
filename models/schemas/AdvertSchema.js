const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// const advertSchemaConstructor = function () {
//     return mongoose.Schema({
//         dogData: Object,
//         authorData: Object,
//     })
// }

const AdvertSchema = mongoose.Schema({
    dogData: {
        breed: String,
        description: String,
        sex: String,
        image: String,
    },
    authorData: {
        name: String,
        email: String,
        phoneNumber: String,
        address: String,
    },
    createdAt: Date,
    location: { lat: Number, lng: Number },
});

class Animal {
    constructor(breed, description, sex, image) {
        this.breed = breed;
        this.description = description;
        this.sex = sex;
        this.image = image;
    }
}

class Author {
    constructor(name, email, phoneNumber, address) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}

AdvertSchema.statics.getAll = async function () {
    return await this.find();
}


module.exports = { AdvertSchema, Animal, Author };