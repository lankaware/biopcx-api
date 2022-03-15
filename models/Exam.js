const mongoose = require("mongoose")
const Schema = mongoose.Schema

const exam = new Schema(
    {
        name: String,
        description: String,
 
    },
    {timestamps: true}
)

mongoose.model("Exam", exam)
