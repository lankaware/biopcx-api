const mongoose = require("mongoose")
const Schema = mongoose.Schema

const billing = new Schema(
    {
        covenantplan_id: mongoose.ObjectId,
        procedure_id: mongoose.ObjectId,
        patient_id: mongoose.ObjectId,
        professional_id: mongoose.ObjectId,
        attendanceDate: Date,
        amount: Number,
        // + fields to control the billing process
        agenda_id: mongoose.ObjectId,
    },
    { timestamps: true }
)

mongoose.model("Billing", billing)
