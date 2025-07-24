// db.ts
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

//details from the env
const dbHost = process.env.MONGO_HOST;
const dbName = process.env.MONGO_DB;
const dbPort = process.env.DB_PORT;

//db connection
export const db = mongoose.connect((`${dbHost}`))
    //(`${dbHost}/${dbName}`))
.then(res => {
    if(res){
        console.log(`Database connection succeffully to ${dbName}`)
    }
    
}).catch(err => {
    console.log(err)
})

export async function close() {
    mongoose.connection.close()
    .then(res => {
        //if(res) {
            console.log(`Disconected`);
        //}
    }).catch(err => {
        console.log(err)
    });
}