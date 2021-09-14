import express, { json } from 'express'
import cors from 'cors'

import professional from '../controllers/professional.js'
// import attended from '../controllers/attended.js'
// import state from '../controllers/state.js'

export default () => {
    const app = express()
    app.use(json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
        app.use(cors())
        next()
    })

    professional(app)
    // attended(app)
    // state(app)

    return app
}

