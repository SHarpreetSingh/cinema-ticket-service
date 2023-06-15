import { Request, Response } from 'express'
import { CinemaModel as cinema } from '../models/cinema.model'

export async function CreateCinema(req: Request, res: Response) {
  const { name, seats } = req.body
  if (!name || !seats) {
    return res.status(422).json({
      status: res.statusCode,
      message: 'Provide cinema name and seats.',
    })
  }

  const obj = { name, seats }
  const result = await cinema.create(obj)
  if (!result) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'This cinema is not created.',
    })
  }

  // All Done
  return res.status(201).json({
    status: res.statusCode,
    message: 'Cinema created sucessfully.',
    cinemaId: result._id,
    result,
  })
}

export async function PurchaseTicket(req: Request, res: Response) {
  const { name, seatNumber } = req.body
  if (!name || !seatNumber) {
    return res.status(422).json({
      status: res.statusCode,
      message: 'Provide cinema name and seat number.',
    })
  }

  if (seatNumber.length === 0) {
    return res.status(422).json({
      message: "Seat number can't be empty.",
    })
  }

  const result = await cinema.findOne({
    name,
    seatNumber: { $in: seatNumber },
  })

  if (result?.seatNumber.length === 10) {
    return res.status(500).json({
      message: 'All seat reserved.',
    })
  }

  if (result) {
    for (let s of seatNumber) {
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
    boughtTicket,
  })
}
