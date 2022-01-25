const mongoose = require("mongoose")
const Schema = mongoose.Schema

const price = new Schema(
    {
        covenantplan_id: mongoose.ObjectId,
        procedure_id: mongoose.ObjectId,
        ambPrice: Number,
        price: Number,
    },
    { timestamps: true }
)

mongoose.model("Price", price)
