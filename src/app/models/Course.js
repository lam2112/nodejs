const mongoose = require("mongoose");
//https://www.npmjs.com/package/mongoose-slug-generator
const slug = require("mongoose-slug-generator");
//https://www.npmjs.com/package/mongoose-delete
const mongooseDelete = require("mongoose-delete");
// https://github.com/ramiel/mongoose-sequence (counte _id (1...))
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        _id: {type: Number},
        name: { type: String, maxLength: 255, require: true },
        description: { type: String, maxLength: 600 },
        image: { type: String, maxLength: 255 },
        videoId: { type: String, require: true },
        level: { type: String, maxLength: 255 },
        slug: { type: String, slug: "name", unique: true },
    },
    { 
        _id: false,
        timestamps: true
    }
);

//custom query helper
CourseSchema.query.sortable  = function(req ){
    if(req.query.hasOwnProperty('_sort')){
        const isValidType =  ['asc', 'desc'].includes(req.query.type);
        return this.sort({
           [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

CourseSchema.plugin(AutoIncrement);
mongoose.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Course", CourseSchema);
