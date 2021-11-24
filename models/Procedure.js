const mongoose = require("mongoose")
const Schema = mongoose.Schema

const procedure = new Schema(
    {
        name: String,
        cbhpm: String,
        carry: String, //porte
    },
    { timestamps: true }
)

mongoose.model("Procedure", procedure)
