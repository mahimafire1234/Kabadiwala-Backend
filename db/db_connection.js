const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://flying_piranha:flying_piranha@softwarica.emril.mongodb.net/kabadiwala?retryWrites=true&w=majority',
    err => {
        if (err) throw err;
    })
