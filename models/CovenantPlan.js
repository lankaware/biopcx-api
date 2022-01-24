const mongoose = require("mongoose")
const Schema = mongoose.Schema

const covenantPlan = new Schema(
    {
        covenant_id: mongoose.ObjectId,
        name: String,
    },
    { timestamps: true }
)

mongoose.model("CovenantPlan", covenantPlan)
