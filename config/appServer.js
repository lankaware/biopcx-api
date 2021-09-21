import express, { json } from 'express'
import cors from 'cors'

import city from '../controllers/_city.js'
import specialty from '../controllers/_specialty.js'
import state from '../controllers/_state.js'

import agenda from '../controllers/agenda.js'
import covenant from '../controllers/covenant.js'
import patient from '../controllers/patient.js'
import procedure from '../controllers/procedure.js'
import professional from '../controllers/professional.js'

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
    specialty(app)
    state(app)

    agenda(app)
    covenant(app)
    patient(app)
    procedure(app)
    professional(app)

    return app
}

