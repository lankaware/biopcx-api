import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbconnect = () => {
        mongoose.connect(process.env.DB_CONN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conexão MongoDb ok.')
    }).catch((err) => {
        console.log('Erro na conexão MongoDb:', err)
    })
}

export default dbconnect
