const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.DB)
        console.log("Database connected.... " );
        

    } catch (error) {
        console.log("error connecting to database");
        
    }
}

module.exports = connectDB;