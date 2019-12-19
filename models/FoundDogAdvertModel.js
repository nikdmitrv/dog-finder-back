const mongoose = require('mongoose');
const { AdvertSchema } = require('./schemas/AdvertSchema');

module.exports = mongoose.model('FoundDogAdvert', AdvertSchema);