import mongoose from "mongoose"
const Schema = mongoose.Schema

const city = new Schema(
    {
        name: String,
        state_id: mongoose.ObjectId,
    },
    { timestamps: true }
)

mongoose.model("City", city)