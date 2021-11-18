import mongoose from "mongoose";
const Schema = mongoose.Schema

const medicine = new Schema(
    {
        name: String,
        chemName: String,
        wayOfuse: String,
        dosage: String,
        lab: String,
    },
    {timestamps: true}
)

mongoose.model("Medicine", medicine)