const mongoose = require('mongoose')
require('../models/Billing.js')
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Billing")
const routeName = "/billing"

module.exports = app => {
    app.get(routeName, tokenok, async(req, res) => {
        await ModelName.find().sort('attendanceDate').then((record) => {
            return res.json({
                error: false,
                record
            })
        }).catch((err) => {
            return res.json({
                error: true,
                message: err
            })
        })
    })

    app.get(routeName + "date/:start/:end", tokenok, async (req, res) => {
        let searchParm = {
            $and: [
                {
                    'attendanceDate': {
                        $gte: new Date(req.params.start)
                    }
                }, {
                    'attendanceDate': {
                        $lte: new Date(req.params.end)
                    }
                }]
        }

        await ModelName.find(searchParm)
            .sort('attendanceDate')
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.findById(req.params.id)
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    
    app.post(routeName, tokenok, async (req, res) => {
        await ModelName.create(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.put(routeName, tokenok, async (req, res) => {
        await ModelName.find(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

   app.put(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.updateOne({ _id: req.params.id }, req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.delete(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.deleteOne({ _id: req.params.id })
            .then( _ => {
                return res.json({
                    error: false,
                    message: "Registro removido.",
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })
}