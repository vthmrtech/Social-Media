import express, { Request, Response } from "express";
import router from "./routes";
import conectToDB from "./config/db";
import dotenv from 'dotenv';
import passport from "passport" 
import  expressSession from 'express-session'
import { initializePassport } from "./middleware/passport";
dotenv.config();


const app = express()
const PORT = process.env.PORT;

conectToDB();

app.use(express.json())

app.use(expressSession({
    secret :"secret",
    resave : false,
    saveUninitialized :false
}))

initializePassport(passport)

app.use(passport.initialize())

app.use(passport.session())


app.get('/test', (req: Request, res: Response): void => {
    res.json({ data: "test", })
})

app.use('/socialmedia', router)
app.use('/image',express.static('./src/public'))

app.listen(PORT, (): void => {
    console.log(`server is running on ${PORT}`)
})
