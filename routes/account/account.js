const express = require('express');
const router = express.Router();
const User = require('../../models/schemas/UserSchema')

// router.get('/:id', async (req, res) => {
//     res.json(await User.findById(req.params.id));
// })

router.route('/:id').get  ((req, res) => {
     const dogs = User.findById(req.params.id).populate("myLost")
    dogs.populate('myFound')

    .then(user=> res.json(user))
})

module.exports = router