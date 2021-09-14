import mongoose from "mongoose"
const Schema = mongoose.Schema

const professional = new Schema({
    name: String,
    cpf: String,
    contactInfo: String,
    admissionDate: Date,
    dismissalDate: Date,
    cns: String,
    cbo: String 
    },
    {timestamps: true}
)

mongoose.model("Professional", professional)