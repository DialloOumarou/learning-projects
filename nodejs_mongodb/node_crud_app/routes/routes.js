const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const multer = require('multer');
const fs = require('fs');

//image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
});

var upload = multer({ storage: storage }).single('image');

//insert a user into database 
router.post('/add',upload,(req,res)=>{

    if (!req.file) {
        return res.json({ message: 'No file uploaded', type: 'danger' });
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename
    });
    user.save()
    .then(() => {
        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        };
        res.redirect('/');
    })
    .catch(error => {
        res.json({ message: error.message, type: 'danger' });
    });

});


//get all users from database
router.get('/', async (req, res) => {
    try {
        const users = await User.find().exec();
        res.render('index', { title: 'Home Page', users: users });
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Add Users' });
});

//edit a user
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).exec();
        if (user == null) {
            res.redirect('/');
        } else {
            res.render('edit_users', { title: 'Edit User', user: user });
        }
    } catch (err) {
        res.redirect('/');
    }
});

//update a user
router.post('/update/:id', upload, async (req, res) => {
    const id = req.params.id;
    let new_image = '';
   
});

module.exports = router;