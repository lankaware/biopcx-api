import mongoose, { isValidObjectId } from "mongoose"
const Schema = mongoose.Schema

const convenant = new Schema(
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
                        procedure_id: ObjectId,
                        ambValue: Number,
                        price: Number
                    }
                ]
            }
        ]
    },
    { timestamps: true }
)

mongoose.model("Convenant", convenant)
