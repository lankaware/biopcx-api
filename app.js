const dbconnect = require('./config/dbConnection.js')
const server = require('./config/appServer.js')

dbconnect()
const app = server()
app.listen(8080, _ => {
    console.log("Servidor BIOPCX iniciado na porta 8080")
})


