const mongoose = require("mongoose")
const Schema = mongoose.Schema

const billing = new Schema(
    {
        unit_id: mongoose.ObjectId,
        attendanceDate: Date,
        patient_id: mongoose.ObjectId,
        professional_id: mongoose.ObjectId,
        procedure_id: mongoose.ObjectId,
        covenant_id: mongoose.ObjectId,
        covenantplan_id: mongoose.ObjectId,
        amount: Number,
        status: String,
        agenda_id: mongoose.ObjectId, // talvez desnecessário
    },
    { timestamps: true }
)

mongoose.model("Billing", billing)
