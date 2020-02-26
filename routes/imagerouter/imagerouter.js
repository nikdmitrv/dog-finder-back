const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const helpers = require('./helpers');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage, fileFilter: helpers.imageFilter })

router.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename)
    const fileExists = fs.existsSync(filePath)
    res.sendFile(fileExists ? filePath : path.join(__dirname, 'uploads','placeholder.jpg'))
})

router.post('/', upload.single('file'), (req, res) => {
    console.log('saved a file')
    res.json({ status: 'ok', message: 'image uploaded', filename: req.file.filename })

})

module.exports = router;
