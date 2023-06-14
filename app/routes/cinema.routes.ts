import { Request, Response, Router } from 'express'
import PurchaseTicket from '../controllers/cinema.controller'

const router = Router()

router.get('/ping', (_req: Request, res: Response) => {
    return res.send("1 Hello")
})

router.get('/purchase-ticket', PurchaseTicket)

export const cinemaRouter = router
