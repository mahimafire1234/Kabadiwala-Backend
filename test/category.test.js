const User = require("../models/User")

const mongoose = require('mongoose');
const Category = require("../models/category");

const url = 'mongodb://localhost:27017/kabadiwala_test';

beforeAll(async () => {
    await mongoose.connect(url, {

        useNewUrlParser: true,
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('category Schema testing ', () => {
    it('Insert rate testing anything', async () => {
        const category_rate = {
            "userID": "1",
            "category_rate": [{
                "price": "10",
                "category": "plastic"
            }]
        };
        const pro_ret = await Category.create(category_rate);
        expect(pro_ret.userID).toEqual('1');
    });
})