import { Request, Response } from 'express'
import { CinemaModel as cinema } from '../models/cinema.model'

export async function CreateCinema(req: Request, res: Response) {
    console.log('uploads', req.body)
    const { name, seats } = req.body
    const obj = {
        name,
        seats
    }
    const result = await cinema.create(obj)
    if (!result) {
        return res.status(500).json({
            status: res.statusCode,
            message: 'This cinema not created.',
        })
    }

    // All Done
    return res.status(201).json({
        status: res.statusCode,
        message: 'Cinema created.',
        cinemaId: result._id,
        result
    })
}

export async function PurchaseTicket(req: Request, res: Response) {
    console.log('req.body', req.body)
    const { name, seatNumber } = req.body

    if (seatNumber.length === 0) {
        return res.status(422).json({
            message: "Seat number can't be empty.",
        })

    }
    const result = await cinema.findOne({ name, seatNumber: { $in: seatNumber } })
    console.log('result', result)

    if (result?.seatNumber.length === 10) {
        return res.status(500).json({
            message: 'All seat reserved.',
        })
    }

    if (result) {
        for (let s of seatNumber) {
            console.log(s, s == 1, s + 1 == 2)
            if (s === 1 && s + 1 === 2) {
                return res.status(500).json({
                    message: 'Already reserved two free consecutive seats.',
                })
            }
        }

        return res.status(500).json({
            message: 'This seat is already reserved.',
        })
    }

    const findCinema = await cinema.findOne({ name })

    console.log("findCinema", findCinema)
    if (!findCinema) {
        return res.status(500).json({
            message: 'Cinema not found with this name',
        })
    }

    findCinema.seatNumber = [...seatNumber, ...findCinema.seatNumber]
    const boughtTicket = await findCinema.save()

    // All Done
    return res.status(res.statusCode).json({
        message: 'Cinema created.',
        cinemaId: boughtTicket?._id,
        boughtTicket
    })
}