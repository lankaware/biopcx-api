const mongoose = require("mongoose")
const Schema = mongoose.Schema

const covenant = new Schema(
    {
        name: String,
        contractNumber: String,
        registerDate: Date,
        billingDay: Number,
        paymentDay: Number,
     },
    { timestamps: true }
)

mongoose.model("Covenant", covenant)
