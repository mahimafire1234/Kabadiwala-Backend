const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://kabadiwala:kabadiwala@cluster0.cfna4.mongodb.net/kabadiwala?retryWrites=true&w=majority',
    err => {
        if (err) throw err;
    })
