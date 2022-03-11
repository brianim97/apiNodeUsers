const mongoose = require('mongoose')

const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_CNN);
        console.log('database OK');
        
        // {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
        //     useFindAndModify: false,
        // }
        
    } catch (error) {
        console.log(error);
        throw new Error("Database error :(")
    }
}

module.exports = dbConnection;