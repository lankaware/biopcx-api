import mongoose from 'mongoose';
import "../models/Professional.js";
import tokenok from "../config/tokenValidate.js"

const ModelName = mongoose.model("Professional")
const routeName = "/professional"

export default app => {
    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'specialties',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: 'specialty'
                }
            },
            {
                $project: { _id: '$_id', name: '$name', phone: '$phone', specialty: '$specialty.name' }
            },
            {
                $sort: { 'name': 1 },
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
        // await ModelName.findById(req.params.id)
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'specialties',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: 'specialty'
                }
            },
            {
                $match: { '_id': _id }
            },
            {
                $project:
                {
                    _id: '$_id',
                    name: '$name',
                    phone: '$phone',
                    specialty_id: '$specialty_id',
                    specialty_name: '$specialty.name',
                    crm: '$crm',
                    email: '$email',
                    phone: '$phone',
                    admissionDate: '$admissionDate',
                    dismissalDate: '$dismissalDate',
                    cns: '$cns',
                    cbo: '$cbo',
                    internal: '$internal',
                    availability: '$availability'
                }
            },
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
        // await ModelName.find(req.body)
        await ModelName.aggregate([
            {
                $lookup:
                {
                    from: 'specialties',
                    localField: 'specialty_id',
                    foreignField: '_id',
                    as: 'specialty'
                }
            },
            {
                $match: req.body
            },
            {
                $project: { _id: '$_id', name: '$name', phone: '$phone', specialty: '$specialty.name' }
            },
            {
                $sort: { 'name': 1 },
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
