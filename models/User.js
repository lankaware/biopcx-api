const mongoose =  require("mongoose")
const Schema = mongoose.Schema

const user = new Schema(
    {
        name: String,
        login: String,
        passw: String,
        role: String,
        professional_id: mongoose.ObjectId,
        userunit: mongoose.ObjectId,
    },
    { timestamps: true }
)

mongoose.model("User", user)