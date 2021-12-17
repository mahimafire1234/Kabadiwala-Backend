// use the path of your model

// const Job = require('../Models/jobModels');
const User= require("../models/User")

const mongoose = require('mongoose');

// use the new name of the database

const url = 'mongodb://localhost:27017/kabadiwala_test';

beforeAll(async () => {

    await mongoose.connect(url, {

        useNewUrlParser: true,

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});



});



afterAll(async () => {

    await mongoose.connection.close();

});



describe('user Schema testing ', () => {

    // the code below is for login user

   
    it('Add user testing anything', async () => {

        const user = {

            "password": "hi",
            "email": "rajivkarky15@gmail.com",
            
            "usertype": "user"
            

            

        };



        const pro_ret = await User.create(user);
        expect(pro_ret.email).toEqual('rajivkarky15@gmail.com');
        expect(pro_ret.password).toEqual('hi');

    });





    // // the code below is for delete testing

    // it('to test the delete user', async () => {

    //     const status = await User.deleteMany();

    //     expect(status.ok).toBe(1);

    // });



    //this is to update userss

    // it('to user the update', async () => {

    //     return User.findOneAndUpdate({ _id: Object('614ff9ce5b90545d50405288') },

    //         { $set: { username: 'rajivkarki' } })

    //         .then((pp) => {

    //             expect(pp.username).toEqual('rajivkarky')

    //         })
            



    // });



})