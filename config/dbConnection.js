const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

module.exports = () => {
        mongoose.connect(process.env.DB_CONN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conexão MongoDb ok.')
    }).catch((err) => {
        console.log('Erro na conexão MongoDb:', err)
    })
}


