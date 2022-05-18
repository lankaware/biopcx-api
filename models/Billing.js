const mongoose = require("mongoose")
const Schema = mongoose.Schema

const billing = new Schema(
    {
        attendanceDate: Date,
        patient_id: mongoose.ObjectId,
        professional_id: mongoose.ObjectId,
        procedure_id: mongoose.ObjectId,
        covenantplan_id: mongoose.ObjectId,
        amount: Number,
        agenda_id: mongoose.ObjectId,
        status: String
    },
    { timestamps: true }
)

mongoose.model("Billing", billing)
