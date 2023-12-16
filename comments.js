// Create web server

// Import express
const express = require('express');
const app = express();

// Import path module
const path = require('path');

// Import bodyParser
const bodyParser = require('body-parser');

// Import mongoose
const mongoose = require('mongoose');

// Connect to mongoose
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});

// Import comment model
const Comment = require('./models/comment');

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use body parser
app.use(bodyParser.urlencoded({extended: false}));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Get all comments
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Comments',
                comments: comments
            });
        }
    });
});

// Add comment
app.post('/comments/add', (req, res) => {
    let comment = new Comment();
    comment.name = req.body.name;
    comment.email = req.body.email;
    comment.body = req.body.body;

    comment.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});

