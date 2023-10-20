const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer  = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Campground = require('../models/campground');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.create))

    // Single media upload
    // .post(upload.single('image'), (req, res) => {
    //     console.log(req.body, req.file)
    //     res.send("It Worked!!!!");
    // })

    // Multiple medias upload
    // .post(upload.array('image', ), (req, res) => {
    //     console.log(req.body, req.files)
    //     res.send("It Worked!!!!");
    // })

router.get('/new', isLoggedIn, (campgrounds.new));

router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

module.exports = router;