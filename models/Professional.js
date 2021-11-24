const mongoose = require("mongoose")
const Schema = mongoose.Schema

const professional = new Schema(
    {
        name: String,
        cpf: String,
        specialty_id: mongoose.ObjectId,
        crm: String,
        email: String,
        phone: String,
        admissionDate: Date,
        dismissalDate: Date,
        cns: String,
        cbo: String,
        internal: Boolean,
        availability: [
            {
                procedure_id: mongoose.ObjectId,
                weekDay: String,
                initialTime: Date,
                finalTime: Date,
                interval: Number,
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Professional", professional)