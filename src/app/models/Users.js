const mongoose = require("mongoose");
//https://www.npmjs.com/package/mongoose-slug-generator
const slug = require("mongoose-slug-generator");
//https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require("mongoose-delete");
// https://github.com/ramiel/mongoose-sequence (counte _id (1...))
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        _id: {type: Number},
        name: { type: String, maxLength: 255, require: true },
        address: { type: String, maxLength: 255 },
        phone_number: { type: Number, maxLength: 11 },
        user_name: { type: String, require: true },
        password: { type: String, require: true },
        in_carf: { type: String, unique: true },
        buying: { type: String, unique: true },
        commplete: { type: String, unique: true } 
    },
    { 
        timestamps: true
    }
);

mongoose.plugin(slug);


module.exports = mongoose.model("User", UserSchema);
