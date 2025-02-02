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
    try {
        const id = req.params.id;
        let new_image = req.body.old_image;

        // If a new image is uploaded, delete the old image
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        }

        // Update the user in the database
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
        });

        // Set a success message and redirect
        req.session.message = {
            type: 'success',
            message: 'User updated successfully!'
        };
        res.redirect('/');
    } catch (err) {
        res.status(500).json({ message: err.message, type: 'danger' });
    }
});


//delete a user
router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
    

        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (result.image) {
            try {
                fs.unlinkSync('./uploads/' + result.image);
                console.log(`Deleted image: ${result.image}`);
            } catch (err) {
                console.error(`Error deleting image: ${err.message}`);
            }
        }

        req.session.message = {
            type: 'success',
            message: 'User deleted successfully'
        };
        res.redirect('/');
    } catch (err) {
        console.error(`Error deleting user: ${err.message}`);
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;