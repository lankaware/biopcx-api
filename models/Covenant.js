import mongoose from "mongoose"
const Schema = mongoose.Schema

const covenant = new Schema(
    {
        name: String,
        contractNumber: String,
        registerDate: Date,
        billingDay: Number,
        dueDay: Number,
        plans: [
            {
                planName: String,
                prices: [
                    {
                        procedure_id: mongoose.ObjectId,
                        ambValue: Number,
                        price: Number
                    }
                ]
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Covenant", covenant)
