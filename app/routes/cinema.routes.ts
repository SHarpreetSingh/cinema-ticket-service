import { Request, Response, Router } from 'express'

const router = Router()

router.get('/ping', (_req: Request, res: Response) => {
    return res.send("1 Hello")
})

export const userRouter = router
