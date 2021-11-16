import mongoose from 'mongoose';
import "../models/Patient.js";
import tokenok from "../config/tokenValidate.js"

const ModelName = mongoose.model("Patient")
const routeName = "/patient"

export default app => {
    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.aggregate([
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
                $project: { _id: '$_id', name: '$name', lastname: '$lastname', phone: '$phone', covenant_name: '$covenant.name' }
            },
            {
                $sort: { 'name': 1 },
            }
        ])
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

    app.get(routeName + "id/:id", tokenok, async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        // await ModelName.findById(req.params.id)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'city',
                    localField: 'city_id',
                    foreignField: '_id',
                    as: 'city'
                },
            },
            {
                $lookup:
                {
                    from: 'covenant',
                    localField: 'covenant_id',
                    foreignField: '_id',
                    as: 'covenant'
                }
            },
            {
                $lookup:
                {
                    from: 'city',
                    localField: 'birthCity_id',
                    foreignField: '_id',
                    as: 'birthCity'
                },
            },
            {
                $lookup:
                {
                    from: 'state',
                    localField: 'rgState_id',
                    foreignField: '_id',
                    as: 'rgState'
                },
            },
            {
                $lookup:
                {
                    from: 'patient',
                    localField: 'relative_id',
                    foreignField: '_id',
                    as: 'relative'
                },
            },
            {
                $match: { '_id': _id }
            },
            {
                $project:
                {
                    _id: '$_id',
                    photo: '$photo',
                    name: '$name',
                    lastname: '$lastname',
                    phone: '$phone',
                    email: '$email',
                    zip: '$zip',
                    address: '$address',
                    addressNumber: '$addressNumber',
                    addressComplement: '$addressComplement',
                    neighborhood: '$neighborhood',
                    city_id: '$city_id',
                    city_name: '$city.name',
                    covenant_id: '$covenant_id',
                    covenant_name: '$covenant.name',
                    covPlan: '$covPlan',
                    covRegistration: '$covRegistration',
                    covValid: '$covValid',
                    birthDate: '$birthDate',
                    birthCity_id: '$birthCity_id',
                    birthCity_name: '$birthCity.name',
                    cpf: '$cpf',
                    rg: '$rg',
                    rgDate: '$rgDate',
                    rgAgency: '$rgAgency',
                    rgState_id: '$rgState_id',
                    rgState_name: '$rgState.name',
                    mothersName: '$mothersName',
                    fathersName: '$fathersName',
                    gender: '$gender',
                    maritalStatus: '$maritalStatus',
                    blodyType: '$blodyType',
                    cns: '$cns',
                    indicatedBy: '$indicatedBy',
                    responsible: '$responsible',
                    responsiblePhone: '$responsiblePhone',
                    registerDate: '$registerDate',
                    relative_id: '$relative_id',
                    relative_name: '$relative.name',
                    relativeType: '$relativeType',
                }
            },
        ])
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            })
            .catch((err) => {
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
