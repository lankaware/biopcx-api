const mongoose = require('mongoose')
require("../models/Agenda.js")
require("../models/Professional.js")
const tokenok = require("../config/tokenValidate.js")
const professional = require('./professional.js')

const ModelName = mongoose.model("Agenda")
const routeName = "/agenda"

const ModelProfessional = mongoose.model("Professional")

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
        let query = req.body
        let dateFilter = new Date(query.dateFilter)
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
        ])
            .then(async records => {
                var addedAgenda = []
                await _completeAgenda(dateFilter)
                    .then(newAgenda => {
                        addedAgenda = [...records, ...newAgenda]
                    })
                return addedAgenda
            })
            .then(record => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    const _completeAgenda = async (dateFilter) => {
        let refDay = (dateFilter.getDay() + 1).toString()
        var emptyAgenda = []
        await ModelProfessional.find()
        .then(result => {
                var newId = 0
                for (let professional of result) {
                    for (let profAvail of professional.availability) {
                        if (profAvail.weekDay !== refDay) continue
                        if (profAvail.interval === 0) continue
                        var initialTime = new Date(profAvail.initialTime.getTime())
                        var nextTime = new Date(initialTime.getTime() + profAvail.interval * 60000)
                        while (nextTime <= profAvail.finalTime) {
                            newId++
                            emptyAgenda.push(
                                {
                                    "_id": newId,
                                    "date": dateFilter,
                                    "initialTime": initialTime,
                                    "finalTime": nextTime,
                                    "professional_id": professional._id,
                                    "professional_name": [professional.name],
                                    "patient_id": "",
                                    "patient_name": [""],
                                    "patient_phone": [""],
                                    "procedure_id": "",
                                    "procedure_name": [""],
                                    "planName": "",
                                    "status": ""
                                }
                            )
                            initialTime = nextTime
                            nextTime = new Date(initialTime.getTime() + profAvail.interval * 60000)
                        }
                    }
                }
            })
        return emptyAgenda
    }

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
