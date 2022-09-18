const { model } = require("mongoose");

module.exports = {
    mutipleMogooseObject: function (mongoose) {
        return mongoose.map((mongoose) => mongoose.toObject());
    },

    mogooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
