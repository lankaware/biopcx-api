import mongoose from "mongoose"
const Schema = mongoose.Schema

const state = new Schema(
    {
        name: String,
        acronym: String,
    },
    { timestamps: true }
)

mongoose.model("State", state)