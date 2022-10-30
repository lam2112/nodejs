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
        username: { type: String},
        password: { type: String},
        role: {type: Number},
    },
);

mongoose.plugin(slug);

module.exports = mongoose.model("Account", AccountSchema);
