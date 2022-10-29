const mongoose = require("mongoose");

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/education", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        useCreateIndex: true;
        console.log("connect succsecfully");
    } catch (error) {
        console.log("connect falure");
    }
}

module.exports = { connect };
