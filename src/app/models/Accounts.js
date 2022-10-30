const mongoose = require("mongoose");
//https://www.npmjs.com/package/mongoose-slug-generator
const slug = require("mongoose-slug-generator");
//https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require("mongoose-delete");
// https://github.com/ramiel/mongoose-sequence (counte _id (1...))
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        username: { type: String, maxLegnth: 255},
        password: { type: String, maxLegnt: 255},
        name: {type: String, maxLegnt: 255},
        age: {type: Number, maxLegnth: 2},
        avt: {type: String},
        address: {type: String},
        phoneNumber: {type: Number, maxLegnth: 9},
        role: {type: Number},
    },
);

// role = 1 <=> admin, role = 2 <=> user

mongoose.plugin(slug);

module.exports = mongoose.model("Account", AccountSchema);
