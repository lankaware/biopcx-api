const mongoose = require('mongoose')
require("../models/Price.js")
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Price")
const routeName = "/price"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {  // + _tn
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

    app.get(routeName + "attendance/:plan/:procedure", tokenok, async (req, res) => {   // + _tn
        let searchParm = { '$and': [{ 'covenantplan_id': req.params.plan }, { 'procedure_id': req.params.procedure }] }
        await ModelName.find(searchParm)
            .select('_id price')
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

    app.get(routeName + "covenant/:id", tokenok, async (req, res) => {   // + _tn
        const _id = new mongoose.Types.ObjectId(req.params.id)
        await ModelName.aggregate([
            {
                $lookup: {
                    from: 'covenantplans',
                    localField: 'covenantplan_id',
                    foreignField: '_id',
                    as: 'covenantplan'
                },
            }, 
            {
                $lookup: {
                    from: 'procedures',
                    localField: 'procedure_id',
                    foreignField: '_id',
                    as: 'procedure'
                },
            },
            {
                $match: {
                    'covenant_id': _id
                }
            },
            {
                $project: {
                    _id: '$_id',
                    covenantplan_id: 1,
                    procedure_id: 1,
                    ambPrice: 1,
                    price: 1,
                    procedure_name: '$procedure.name',
                    covenantplan_name: '$covenantplan.name',
                },
            },
            {
                $sort: {
                    'name': 1
                },
            },
        ])
            .then((record) => {
                console.log('record', record)
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
