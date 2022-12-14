const mongoose = require("mongoose");
//https://www.npmjs.com/package/mongoose-slug-generator
const slug = require("mongoose-slug-generator");
//https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require("mongoose-delete");
// https://github.com/ramiel/mongoose-sequence (counte _id (1...))
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        name: { type: String, maxLength: 255, require: true, unique: true },
        classify: { type: String, maxLength: 255 },
        amount: { type: Number, maxLenght: 20},
        image: {type: String},
        description: { type: String, maxLength: 600 },
        from: {type: String, maxLengt: 255},
        cost: { type: Number },
        slug: { type: String, slug: "name", unique: true },
    },
    { 
        timestamps: true
    }
);

mongoose.plugin(slug);
ItemSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Item", ItemSchema);
