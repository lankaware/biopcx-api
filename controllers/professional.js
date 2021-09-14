import mongoose from 'mongoose';
import "../models/Professional.js";
const Professional = mongoose.model("Professional")

export default app => {
    app.get("/professionals", async (req, res) => {
        await Professional.find(req.body)
            .sort('name')
            .then((professional) => {
                return res.json({
                    error: false,
                    professional
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: "Profissional não encontrado."
                })
            })
    })

    app.get("/professional_name/:name", async (req, res) => {
        let searchParm = { "name": { "$gte": req.params.name } }
        await Professional.find(searchParm)
            .select('name')
            .sort('name')
            .then((professional) => {
                return res.json({
                    error: false,
                    professional
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: "Profissional não encontrado."
                })
            })
    })

    app.get("/professional_id/:id", async (req, res) => {
        let searchParm = { "_id": req.params.id }
        await Professional.find(searchParm)
            .then((professional) => {
                return res.json({
                    error: false,
                    professional
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: "Profissional não encontrado."
                })
            })
    })

    app.post("/professional", async (req, res) => {

        await Professional.create(req.body)
            .then((professional) => {
                return res.json({
                    error: false,
                    professional,
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: "Profissional não cadastrado."
                })
            })
    })

    app.put("/professional", async (req, res) => {

        await Professional.findById(req.body._id, (err, register) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro: profissional não cadastrado."
                })
            } else {
                register.name = req.body.name
                register.cpf = req.body.cpf
                register.contactInfo = req.body.contactInfo
                register.admissionDate = req.body.admissionDate
                register.dismissalDate = req.body.dismissalDate
                register.cns = req.body.cns
                register.cbo = req.body.cbo
                register.save()
                return res.json({
                    error: false,
                    message: "Profissional atualizado."
                })
            }
        })
    })

    app.delete("/professional", async (req, res) => {
        await Professional.findByIdAndDelete(req.body._id, (err, register) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: "Erro de deleção: profissional não cadastrado."
                })
            } else {
                return res.json({
                    error: false,
                    message: "Profissional deletado!"
                })
            }
        })
    })

}
