
import { connectDb } from "./src/config/db.js"
import  dotenv from "dotenv"
import { app } from "./app.js"

dotenv.config({
    path:"./.env"
})



connectDb()
.then( () => {
    app.listen( process.env.PORT || 9000, (err) => {
        if(err) return console.log('error while runnig the server');

        console.log(`Server is running ${process.env.PORT}`);
        
        
    })
})

