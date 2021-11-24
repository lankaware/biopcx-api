const mongoose = require("mongoose")
const Schema = mongoose.Schema

const specialty = new Schema(
    {
        name: String,
    },
    { timestamps: true }
)

mongoose.model("Specialty", specialty)