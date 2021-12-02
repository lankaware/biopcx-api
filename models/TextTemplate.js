const mongoose = require("mongoose")
const Schema = mongoose.Schema

const textTemplate = new Schema(
    {
        name: String,
        type: String,
        text: String,
    },
    { timestamps: true }
)

mongoose.model("TextTemplate", textTemplate)
