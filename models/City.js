import mongoose from "mongoose"
const Schema = mongoose.Schema

const city = new Schema(
    {
        name: String,
        state_id: ObjectId,
    },
    { timestamps: true }
)

mongoose.model("City", city)