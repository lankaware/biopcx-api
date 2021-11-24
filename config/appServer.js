const express = require('express')
const cors = require('cors')
const consign = require('consign')

module.exports = () => {
    const app = express()
    app.use(express.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
        app.use(cors())
        next()
    })

    consign()
    .include('controllers')
    .into(app)

    return app
}

