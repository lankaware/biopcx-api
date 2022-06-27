const mongoose = require("mongoose")
const Schema = mongoose.Schema

const agenda = new Schema(
    {
        date: Date,
        initialTime: Date,
        finalTime: Date,
        professional_id: mongoose.ObjectId,
        patient_id: mongoose.ObjectId,
        procedure_id: mongoose.ObjectId,
        covenant_id: mongoose.ObjectId,
        covenantplan_id: mongoose.ObjectId,
        phone: String,
        email: String,
        status: String,
    },
    { timestamps: true }
)

mongoose.model("Agenda", agenda)
