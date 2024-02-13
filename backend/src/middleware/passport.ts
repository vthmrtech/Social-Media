import { Strategy as LocalStrategy} from "passport-local"
import users from "../models/usersSchema";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

export const initializePassport = (passport:any) => {
  passport.use(
    new LocalStrategy(
      
        {
          usernameField: "email",
          passwordField: "password",
        },
        async function (username : string, password : string, done) {
          try {
            const user = await users.findOne({ email: username });
            if (!user) return done(null, false ,{message :"User not found"});

            const passwordVerify: boolean = await bcrypt.compare(
              password ,
              user.password || ""
            );
            if (!passwordVerify) return done(null, false);
            return done(null, user);

          } catch (error) {
                return done(error,false)
          }
        }
      )
    )

  passport.serializeUser((user :any, done : any) => done(null, user._id))

  passport.deserializeUser(async (id :any, done:any) => {
        try {
                const user =  await users.findById(id)

                done(null,user)
        } catch (error) {
                done(error,false)
        }
  })
};


export const isAuthenticated = (req :Request, res:Response ,next :NextFunction) =>{
  if(req.user) return next()

  return res.json({status :false,message :"You are not Logged in"})
}