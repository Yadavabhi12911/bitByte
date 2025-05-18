
import { connectDb } from "./src/config/db.js"
import { app } from "./app.js"




connectDb()
.then( () => {
    app.listen( process.env.PORT || 9000, (err) => {
        if(err) return console.log('error while runnig the server');

        console.log(`Server is running ${process.env.PORT}`);
        
        
        
        
    })
})

