const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/kabadiwala',
    err => {
        if (err) throw err;
    })