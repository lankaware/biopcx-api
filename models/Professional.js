import mongoose from "mongoose"
const Schema = mongoose.Schema

const professional = new Schema(
    {
        name: String,
        cpf: String,
        specialty_id: ObjectId,
        crm: String,
        email: String,
        phone: String,
        admissionDate: Date,
        dismissalDate: Date,
        cns: String,
        cbo: String,
        internal: String,
        availability: [
            {
                proceudre_id: ObjectId,
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