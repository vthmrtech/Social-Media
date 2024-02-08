import express, { Request, Response } from "express";
import router from "./routes";
import conectToDB from "./config/db";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const PORT = process.env.PORT;
conectToDB();
app.use(express.json())

app.get('/test', (req: Request, res: Response): void => {
    res.json({ data: "test", })
})

app.use('/socialmedia', router)
app.use('/image',express.static('./src/public'))

app.listen(PORT, (): void => {
    console.log(`server is running on ${PORT}`)
})
