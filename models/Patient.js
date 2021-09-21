import mongoose from "mongoose"
const Schema = mongoose.Schema

const patient = new Schema(
    {
        name: String,
        phone: String,
        email: String,
        zip: String,
        address: String,
        addressNumber: String,
        addressComplement: String,
        neighborhood: String,
        city_id: mongoose.ObjectId,
        // state_id: ObjectId,
        convenant_id: mongoose.ObjectId,
        convPlan: String,
        convRegistration: String,
        convValid: Date,
        birthDate: Date,
        birthCity_id: mongoose.ObjectId,
        cpf: String,
        rg: String,
        rgDate: Date,
        rgAgency: String,
        rgState_id: mongoose.ObjectId,
        mothersName: String,
        fathersName: String,
        gender: String,
        maritalStatus: String,
        blodyType: String,
        cns: String,
        indicatedBy: String,
        responsible: String,
        responsiblePhone: String,
        registerDate: Date,
        bond_id: mongoose.ObjectId,
        bondType: String, 
        evolution: [
            {
                dateTime: Date,
                description: String,
            }
        ],
        prescription: [
            {
                date: Date,
                drug: String,
                dosage: String,
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Patient", patient)
