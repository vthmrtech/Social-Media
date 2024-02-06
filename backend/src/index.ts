import express, { Request, Response } from "express";
import router from "./routes";
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const PORT = process.env.PORT;

app.get('/test', (req: Request, res: Response): void => {
    res.json({ data: "test", })
})

app.use('/socialMedia', router)

app.listen(PORT, (): void => {
    console.log(`server is running on ${PORT}`)
})