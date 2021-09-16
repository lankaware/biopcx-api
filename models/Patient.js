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
        city_id: ObjcetId,
        // state_id: ObjectId,
        convenant_id: ObjectId,
        convPlan: String,
        convRegistration: String,
        convValid: Date,
        birthDate: Date,
        birthCity_id: ObjectId,
        cpf: String,
        rg: String,
        rgDate: Date,
        rgAgency: String,
        rgState_id: ObjectId,
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
        bond_id: ObjectId,
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
