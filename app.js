const express = require('express')
const bodyParser = require('body-parser')

require('./db/db_connection')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const userRoute = require('./routes/User')
const categoryRoute = require('./routes/Category')


app.use('/user', userRoute)
app.use('/category', categoryRoute)

app.listen(5000)