import { Schema, model as Model } from 'mongoose'
const ObjectId = Schema.Types.ObjectId

export interface IBaseModel {
    createdAt?: Date
    updatedAt?: Date
}

interface Cinema extends IBaseModel {
    seat: number
}

const schema = new Schema<Cinema>(
    {
        seat: { type: Number },
    },
    {
        autoIndex: true,
        versionKey: false,
        timestamps: true,
    }
)

export const CinemaModel = Model<Cinema>(
    'Cinema',
    schema,
    'Cinema'
)
