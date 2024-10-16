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
                $lookup:
                {
                    from: 'unit',
                    localField: 'unit_id',
                    foreignField: '_id',
                    as: 'name'
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
                    patient_name: ['$patient.name', ' ', '$patient.lastname'],
                    patient_phone: '$patient.phone',
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    // planName: '$planName',
                    phone: 1,
                    email: 1,
                    status: 1,
                    unit_id: '$unit_id',
                    unit_name: '$unit.name',
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

        const _id = new mongoose.Types.ObjectId(req.params.id)
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
                    from: 'unit',
                    localField: 'unit_id',
                    foreignField: '_id',
                    as: 'name'
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
                    patient_name: ['$patient.name', ' ', '$patient.lastname'],
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    covenant_id: '$covenant_id',
                    covenantplan_id: '$covenantplan_id',
                    phone: 1,
                    email: 1,
                    status: 1,
                    unit_id: '$unit_id',
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
        let filters = [{$or: [{unit_id: new mongoose.Types.ObjectId(query.unitcontext)}, {unit_id: null}]}]
        let dateFilter, tomorrow
        if (query.dateFilter) {
            dateFilter = new Date(query.dateFilter)  // ,  "$lt": new Date(query.dateFilter)
            tomorrow = new Date(dateFilter)
            tomorrow.setDate(tomorrow.getDate() + 1)
            filters = [...filters, { 'date': { "$gte": dateFilter, "$lt": tomorrow } }]
        }
        if (query.patientFilter) {
            filters = [...filters, { patient_id:  new mongoose.Types.ObjectId(query.patientFilter)}]
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
                    from: 'unit',
                    localField: 'unit_id',
                    foreignField: '_id',
                    as: 'name'
                }
            },
            {
                $match: finalFilter 
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
                    patient_name: ['$patient.name', ' ', '$patient.lastname'],
                    patient_phone: '$patient.phone',
                    patient_internalRegister: '$patient.internalRegister',
                    procedure_id: '$procedure_id',
                    procedure_name: '$procedure.name',
                    covenant_id: '$covenant_id',
                    covenantplan_id: '$covenantplan_id',
                    phone: 1,
                    email: 1,
                    status: 1,
                    firstAppoint: '$patient.firstAppoint',
                    unit_id: '$unit_id',
                }
            },
            {
                $sort: { 'date': 1 },
            }
        ])
            .then(async records => {
                var addedAgenda = []
                // await _completeAgenda(dateFilter, records, mongoose.Types.ObjectId(query.unitcontext))
                await _completeAgenda(dateFilter, records, query.unitcontext)
                .then(newAgenda => {
                    addedAgenda = [...records, ...newAgenda]
                })
                return addedAgenda
            })
            .then(fullAgenda => {
                fullAgenda.sort((a, b) => {
                    if (a.initialTime > b.initialTime) return 1
                    else return -1
                })
                return fullAgenda
            })
            .then(record => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                console.log('err', err)
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    const _completeAgenda = async (dateFilter, busyRecs, unitcontext) => {
        let refDay = (dateFilter.getDay() + 0).toString()
        var emptyAgenda = []
        await ModelProfessional.find()
            .then(result => {
                var newId = 0
                for (let professional of result) {
                    for (let profAvail of professional.availability) {
                        if (profAvail.weekDay !== refDay) continue
                        if (profAvail.interval === 0) continue
                        if (profAvail.unit_id && (profAvail.unit_id).toString() !== unitcontext) continue
                        var initialTime = new Date(profAvail.initialTime.getTime())
                        var nextTime = new Date(initialTime.getTime() + profAvail.interval * 60000)
                        while (nextTime <= profAvail.finalTime) {
                            var alreadyExists = busyRecs.find(element => {
                                return (element.initialTime >= initialTime && element.finalTime <= nextTime)
                            })
                            if (!alreadyExists) {
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
                                        "covenant_id": "",
                                        "covenant_name": [""],
                                        "covenantplan_id": "",
                                        "covenantplan_name": [""],
                                        "phone": "",
                                        "email": "",
                                        "status": "",
                                        "unit_id": profAvail.unit_id,
                                    }
                                )
                            }
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
