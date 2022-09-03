const { model } = require("mongoose");

module.exports = {
    mutipleMogooseObject: function (mongoose) {
        return mongoose.map((mongoose) => mongoose.toObject());
    },

    mogooseObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
