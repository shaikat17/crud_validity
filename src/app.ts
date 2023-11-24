import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.routes'
const app: Application = express()


// parser
app.use(express.json())
app.use(cors())

// user router
app.use('/api/', userRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World")
})


export default app