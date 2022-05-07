const mongoose = require('mongoose')
require("../models/Agenda.js")
const tokenok = require("../config/tokenValidate.js")

const ModelName = mongoose.model("Agenda")
const routeName = "/agenda"

module.exports = app => {
    app.get(routeName, tokenok, async (req, res) => {
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
                $project:
                {
                    _id: '$_id',
                    date: '$date',
                    initialTime: '$initialTime',
                    finalTime: '$finalTime',
                    professional_id: '$professional_id',
                    professional_name: '$professional.name',
                    patient_id: '$patient_id',
                    patient_name: '$patient.name',
                    patient_phone: '$patient.phone',
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    planName: '$planName',
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

    app.get(routeName + "id/:id", async (req, res) => {

        const _id = mongoose.Types.ObjectId(req.params.id)
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
                $match: { '_id': _id }
            },
            {
                $project:
                {
                    _id: '$_id',
                    date: '$date',
                    initialTime: '$initialTime',
                    finalTime: '$finalTime',
                    professional_id: '$professional_id',
                    professional_name: '$professional.name',
                    patient_id: '$patient_id',
                    patient_name: '$patient.name',
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    planName: '$planName',
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
        console.log(req.body)
        let query = req.body
        let dateFilter = new Date(query.dateFilter)
        // await ModelName.find({date:{$gte: new Date(query.dateFilter)}}) // 
        // await ModelName.find({ date: { $gte: new Date("2022-05-12") } })
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
                $match: { 'date': { "$gte": dateFilter } }
            },
            {
                $project:
                {
                    _id: '$_id',
                    date: '$date',
                    initialTime: '$initialTime',
                    finalTime: '$finalTime',
                    professional_id: '$professional_id',
                    professional_name: '$professional.name',
                    patient_id: '$patient_id',
                    patient_name: '$patient.name',
                    patient_phone: '$patient.phone',
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    planName: '$planName',
                    status: '$status'
                }
            },
            {
                $sort: { 'date': 1 },
            }
        ]).then((record) => {
            date = new Date();
            record.push(
                {
                    "_id": "1",
                    "date": date,
                    "initialTime": "",
                    "finalTime": "",
                    "professional_id": "",
                    "professional_name": [
                        ""
                    ],
                    "patient_id": "",
                    "patient_name": [
                        ""
                    ],
                    "patient_phone": [
                        ""
                    ],
                    "procedure_id": "",
                    "procedure_name": [
                        ""
                    ],
                    "planName": "",
                    "status": ""
                }
            )
            console.log(record)
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
