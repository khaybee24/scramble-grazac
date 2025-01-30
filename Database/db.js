const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        console.log(process.env.DB);
        
        await mongoose.connect(process.env.DB)
        console.log("Database connected.... " );
        

    } catch (error) {
        console.log(error);
        
        console.log("error connecting to database");
        
    }
}

module.exports = connectDB;