const mongoose = require("mongoose")
const Schema = mongoose.Schema

const city = new Schema(
    {
        name: String,
        state: String,
    },
    { timestamps: true }
)

mongoose.model("City", city)