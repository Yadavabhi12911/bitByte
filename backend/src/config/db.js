
import mongoose  from "mongoose"

const connectDb = async function(){
    let connectionIntance = mongoose.connect(process.env.MONGODB_URL)
    console.log(`database is connected ${(await connectionIntance).connection.host}` );
    
}

export {connectDb}