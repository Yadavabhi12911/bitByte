
import mongoose  from "mongoose"

import  dotenv  from "dotenv"

dotenv.config({
    path:"./.env"
})


const connectDb = async function(){
    let connectionIntance = mongoose.connect(process.env.MONGODB_URL)
    console.log(`database is connected ${(await connectionIntance).connection.host}` );
    
}

export {connectDb}