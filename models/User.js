const mongoose =  require("mongoose")
const Schema = mongoose.Schema

const user = new Schema(
    {
        name: String,
        login: String,
        passw: String,
        role: String,
    },
    { timestamps: true }
)

mongoose.model("User", user)