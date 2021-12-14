const express = require('express')
const bodyParser = require('body-parser')

require('./db/db_connection')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoute = require('./routes/User')

app.use('/user', userRoute)

app.listen(5000)