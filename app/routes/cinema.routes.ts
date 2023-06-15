import { Request, Response, Router } from 'express'
import { CreateCinema, PurchaseTicket } from '../controllers/cinema.controller'

const router = Router()

router.get('/ping', (_req: Request, res: Response) => {
  return res.send('You are in cinema routes!!')
})

router.post('/cinema', CreateCinema)
router.post('/purchase-ticket', PurchaseTicket)

export const cinemaRouter = router
