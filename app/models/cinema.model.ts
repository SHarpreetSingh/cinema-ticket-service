import { Schema, model as Model } from 'mongoose'

export interface IBaseModel {
    createdAt?: Date
    updatedAt?: Date
}

interface Cinema extends IBaseModel {
    name: string
    seats: number
    seatNumber: number[]
}

const schema = new Schema<Cinema>(
    {
        name: { type: String },
        seats: { type: Number },
        seatNumber: [Number],
    },
    {
        autoIndex: true,
        versionKey: false,
        timestamps: true,
    }
)

export const CinemaModel = Model<Cinema>(
    'cinema',
    schema,
    'cinema'
)
