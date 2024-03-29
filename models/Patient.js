const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const patient = new Schema(
  {
    photo: String,
    name: String,
    lastname: String,
    internalRegister: Number,
    unit_id: mongoose.ObjectId,
    phone: String,
    email: String,
    zip: String,
    address: String,
    addressNumber: String,
    addressComplement: String,
    neighborhood: String,
    city: String,
    state: String,
    covenant_id: mongoose.ObjectId,
    covenantplan_id: mongoose.ObjectId,
    covRegistration: String,
    covValid: Date,
    birthDate: Date,
    birthCity: String,
    birthState: String,
    cpf: String,
    rg: String,
    rgDate: Date,
    rgAgency: String,
    rgState: String,
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
    clinicHist: String,
    familyHist: String,
    patientHist: String,
    catheter: String,
    surgery: String,
    freeTextOneTitle: String,
    freeTextOne: String,
    freeTextTwoTitle: String,
    freeTextTwo: String,
    alert: String,
    prescription: [
      {
        date: Date,
        prescContent: String,
      },
    ],
    request: [
      {
        date: Date,
        reqContent: String,
      },
    ],
  },
  { timestamps: true }
);




mongoose.model("Patient", patient);
