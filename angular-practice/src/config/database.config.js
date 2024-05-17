const mongoose = require('mongoose');

const connectDB = async (db) => {
    try {
        await mongoose.connect(db);
        console.log('The connect is successfully...')
    } catch (error) {
        console.log('THe connect failed...')
    }
}

module.exports  = connectDB