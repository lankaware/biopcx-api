const mongoose = require('mongoose')
require("../models/Procedure.js")
const tokenok = require("../config/tokenValidate.js")

const ModelPrice = mongoose.model("Price")
const ModelName = mongoose.model("Procedure")
const routeName = "/procedure"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.find()
            .sort('name')
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

    app.get(routeName + "name/:name", tokenok, async (req, res) => {
        let searchParm = { '$and': [{ 'name': { '$gte': req.params.name } }, { 'name': { '$lte': req.params.name + '~' } }] }
        await ModelName.find(searchParm)
            .select('_id name')
            .sort('name')
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

    app.get(routeName + "namexact/:name", tokenok, async (req, res) => {
        let searchParm = { 'name': req.params.name }
        await ModelName.find(searchParm)
            .select('_id')
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

    app.get(routeName + "value/:cov/:plan", tokenok, async (req, res) => {
        // let searchParm = { '$and': [{ 'name': { '$gte': req.params.name } }, { 'name': { '$lte': req.params.name + '~' } }] }
        var newRecord = []
        await ModelName.find()
            .sort('name')
            .then(async (record) => {
                for (item of record) {
                    let covValue = 0
                    let searchObj = {
                        covenant_id: new mongoose.Types.ObjectId(req.params.cov),
                        covenantplan_id: new mongoose.Types.ObjectId(req.params.plan),
                        procedure_id: new mongoose.Types.ObjectId(item._id),
                    }
                    await ModelPrice.find(searchObj)
                        .then(result => {
                            if (result[0])
                                covValue = result[0].price
                        })
                    newRecord = [...newRecord, { ...item._doc, price: covValue }]
                }
                return newRecord
            })
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

    const _calcAmount = async (covId, covPlan, covProc) => {
        let covValue = 0
        let searchObj = {
            covenant_id: new mongoose.Types.ObjectId(covId),
            covenantplan_id: new mongoose.Types.ObjectId(covPlan),
            procedure_id: new mongoose.Types.ObjectId(covProc),
        }
        await ModelPrice.find(searchObj)
            .then(result => {
                if (result[0])
                    covValue = result[0].price
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
        return covValue
    }

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

    app.delete(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.deleteOne({ _id: req.params.id })
            .then(_ => {
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
