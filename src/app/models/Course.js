const mongoose = require("mongoose");
//https://www.npmjs.com/package/mongoose-slug-generator
const slug = require("mongoose-slug-generator");
//https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true },

);

mongoose.plugin(slug);
Course.plugin(mongooseDelete,  {
    deleteAt: true,
    overrideMethods: 'all',
} )

module.exports = mongoose.model("Course", Course);
