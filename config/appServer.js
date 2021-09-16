import express, { json } from 'express'
import cors from 'cors'

import city from '../controllers/city.js'
import convenant from '../controllers/convenant.js'
import patient from '../controllers/patient.js'
import procedure from '../controllers/procedure.js'
import professional from '../controllers/professional.js'
import specialty from '../controllers/specialty.js'
import state from '../controllers/state.js'

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

    city(app)
    convenant(app)
    patient(app)
    procedure(app)
    professional(app)
    specialty(app)
    state(app)

    return app
}

