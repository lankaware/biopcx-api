const mongoose = require('mongoose')
require("../models/User.js")
const ModelName = mongoose.model("User")
const routeName = "/user"
const jsonwebtoken = require('jsonwebtoken')
const tokenok = require("../config/tokenValidate.js")
const CryptoJS = require('crypto-js')

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
        let searchParm = { name: req.params.name }
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

    app.get(routeName + "login/:login", tokenok, async (req, res) => {
        let searchParm = { login: req.params.login }
        await ModelName.find(searchParm)
            .select('name login')
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
        let recObj = {
            name: req.body.name,
            login: req.body.login,
            passw: req.body.passw
        }
        await ModelName.create(recObj)
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

    app.post(routeName + 'login/:login', async (req, res) => {
        let searchParm = { login: req.params.login }
        let record = await ModelName.find(searchParm)
            .select('name login passw role')
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
        if (!record[0]) {
            return res.json({
                error: true,
                message: 'Usuário ou senha inválidos.'
            })
        }
        const pw1 = CryptoJS.AES.decrypt(req.body.passw, process.env.SECRET).toString(CryptoJS.enc.Utf8);
        const pw2 = CryptoJS.AES.decrypt(record[0].passw, process.env.SECRET).toString(CryptoJS.enc.Utf8);

        if (pw1 !== pw2) {
            return res.json({
                error: true,
                message: 'Usuário ou senha inválidos.'
            })
        }
        const passw = JSON.stringify(req.body.passw)
        var privatekey = process.env.SECRET
        var token = jsonwebtoken.sign({ passw }, privatekey, {
            expiresIn: 7200  // 2hr = 7200 - 12hrs = 43200
        })
        req.body.name = record[0].name
        req.body.role = record[0].role
        req.body.token = token
        return res.json(req.body)
    })
}