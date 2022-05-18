const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const prePatient = new Schema(
  {
    name: String,
    lastname: String,
    phone: String,
    email: String,
    covenant_id: mongoose.ObjectId,
    covPlan: String,
  },
  { timestamps: true }
);




mongoose.model("PrePatient", prePatient);