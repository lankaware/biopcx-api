const mongoose = require("mongoose")
const Schema = mongoose.Schema

const unit = new Schema(
    {
        name: String,
        city: String,
    },
    { timestamps: true }
)

mongoose.model("Unit", unit)