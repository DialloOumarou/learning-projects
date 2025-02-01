//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 4000;

//database connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error)=>console.log(error));
db.once('open', ()=>console.log('Connected to the database'));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret:'my_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//set template engine
app.set('view engine', 'ejs');

//routes prefixes
app.use("",require('./routes/routes'));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});