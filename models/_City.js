const mongoose = require("mongoose")
const Schema = mongoose.Schema

const city = new Schema(
    {
        name: String,
    },
    { timestamps: true }
)

mongoose.model("City", city)