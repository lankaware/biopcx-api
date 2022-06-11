const mongoose = require('mongoose')
require('../models/Billing.js')
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Billing")
const routeName = "/billing"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {

        const dateDefault = new Date()
        const tempDate = dateDefault.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        const stringDate = tempDate.substring(6, 10) + '-' + tempDate.substring(3, 5) + '-' + tempDate.substring(0, 2)
        
        minDate = new Date(stringDate)
        maxDate = new Date(minDate)
        maxDate.setDate(maxDate.getDate() + 1)
        
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'professionals',
                    localField: 'professional_id',
                    foreignField: '_id',
                    as: 'professional'
                }
            },
            {
                $lookup:
                {
                    from: 'patients',
                    localField: 'patient_id',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $lookup:
                {
                    from: 'procedures',
                    localField: 'procedure_id',
                    foreignField: '_id',
                    as: 'procedure'
                }
            },
            {
                $lookup:
                {
                    from: 'covenants',
                    localField: 'covenant_id',
                    foreignField: '_id',
                    as: 'covenant'
                }
            },
            {
                $lookup:
                {
                    from: 'covenantplans',
                    localField: 'covenantplan_id',
                    foreignField: '_id',
                    as: 'covenantplan'
                }
            },
            {
                $match: {$and: [{ 'attendanceDate': { "$gte": minDate, "$lt": maxDate  } }] }
                // $match: { 'attendanceDate': { "$gte": new Date("2020-01-01"), "$lt": new Date("2023-01-01") } }
            },
            {
                $project:
                {
                    _id: 1,
                    attendanceDate: 1,
                    patient_id: 1,
                    patient_name: '$patient.name',
                    professional_id: 1,
                    professional_name: '$professional.name',
                    procedure_id: 1,
                    procedure_name: '$procedure.name',
                    covenant_id: 1,
                    covenant_name: '$covenant.name',
                    covenantplan_id: 1,
                    covenantplan_name: '$covenantplan.name',
                    amount: 1,
                    status: '$status'
                }
            },
            {
                $sort: { 'date': 1 },
            }
        ])
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
        let query = req.body
        let filters = []
        if (query.dateFilter) {
            let dateFilter = new Date(query.dateFilter) 
            let tomorrow = new Date(dateFilter)
            tomorrow.setDate(tomorrow.getDate() + 1)
            filters = [{ 'attendanceDate': { "$gte": dateFilter, "$lt": tomorrow } }] 
        }
        if (query.patientFilter) {
            filters = [...filters, { patient_id:  mongoose.Types.ObjectId(query.patientFilter)}]
        }
        if (query.covenantFilter) {
            filters = [...filters, { covenant_id:  mongoose.Types.ObjectId(query.covenantFilter)}]
        }

        finalFilter = {$and: filters}
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'professionals',
                    localField: 'professional_id',
                    foreignField: '_id',
                    as: 'professional'
                }
            },
            {
                $lookup:
                {
                    from: 'patients',
                    localField: 'patient_id',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $lookup:
                {
                    from: 'procedures',
                    localField: 'procedure_id',
                    foreignField: '_id',
                    as: 'procedure'
                }
            },
            {
                $lookup:
                {
                    from: 'covenants',
                    localField: 'covenant_id',
                    foreignField: '_id',
                    as: 'covenant'
                }
            },
            {
                $lookup:
                {
                    from: 'covenantplans',
                    localField: 'covenantplan_id',
                    foreignField: '_id',
                    as: 'covenantplan'
                }
            },
            {
                $match: finalFilter // { 'patient_id':  {'$eq': '616aafeda6d90071b813b1ea'}}
            },
            {
                $project:
                {
                    _id: 1,
                    attendanceDate: 1,
                    patient_id: 1,
                    patient_name: ['$patient.name', ' ', '$patient.lastname'] ,
                    professional_id: 1,
                    professional_name: '$professional.name'  ,
                    procedure_id: 1,
                    procedure_name: '$procedure.name',
                    covenant_id: 1,
                    covenant_name: '$covenant.name',
                    covenantplan_id: 1,
                    covenantplan_name: '$covenantplan.name',
                    amount: 1,
                    status: '$status'
                }
            },
            {
                $sort: { 'date': 1 },
            }
        ])
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