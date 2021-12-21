const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const patient = new Schema(
  {
    photo: String,
    name: String,
    lastname: String,
    phone: String,
    email: String,
    zip: String,
    address: String,
    addressNumber: String,
    addressComplement: String,
    neighborhood: String,
    city_id: mongoose.ObjectId,
    // state_id: ObjectId,
    covenant_id: mongoose.ObjectId,
    covPlan: String,
    covRegistration: String,
    covValid: Date,
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
    relative_id: mongoose.ObjectId,
    relativeType: String,
    height: Number,
    weight: Number,
    imc: Number,
    firstAppoint: Date,
    lastAppoint: Date,
    hist: String,
    familyHist: String,
    PatientHist: String,
    catheter: String,
    surgery: String,
    freeTextOneTitle: String,
    freeTextOne: String,
    freeTextTwoTitle: String,
    freeTextTwo: String,

    evolution: [
      {
        dateTime: Date,
        description: String,
      },
    ],
    prescription: [
      {
        date: Date,
        prescContent: String,
      },
    ],
  },
  { timestamps: true }
);




mongoose.model("Patient", patient);
