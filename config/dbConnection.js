import mongoose from 'mongoose'

const dbconnect = () => {
        // mongoose.connect('mongodb://localhost:27017/biopcx', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
        mongoose.connect('mongodb+srv://lankadb:gynkJMmuQE2J45u@cluster0.qifx3.mongodb.net/biopcx?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Conexão MongoDb ok.')
    }).catch((err) => {
        console.log('Erro na conexão MongoDb:', err)
    })
}

export default dbconnect
