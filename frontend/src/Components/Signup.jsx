import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import uuid4 from 'uuid4'
import { addUser } from '../Store/Slice/UsersSlice'
import { Box, Typography } from '@mui/material'
import { Facebook, Google } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import { Context } from '../App'
import { signup } from '../Store/actions/userActions'



const Signup = () => {
  let isLogin = useContext(Context)
  const [signUpObj, setsignUpObj] = useState({ email: "", password: "", cpassword: "" })
  const [error, seterror] = useState({ email: "", password: "", cpassword: "" })
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const data = useSelector((state) => state.users.data)
  const signUpData = async (e) => {
    if (e.target.type == "password" && e.target.name == "cpassword") {

      if (e.target.value == signUpObj['password']) {
        signUpObj[e.target.name] = e.target.value

        error[e.target.name] = ""

      }
      else {
        signUpObj[e.target.name] = e.target.value
        error[e.target.name] = "Confirm Password And password should match"
      }
    }
    else if (e.target.name == "email") {
      const email = false
      if (email) {
        seterror({ email: "Email Already Exists" })
        signUpObj[e.target.name] = e.target.value
      }
      else {
        signUpObj[e.target.name] = e.target.value
        error[e.target.name] = ""


      }
    }
    else {
      signUpObj[e.target.name] = e.target.value
    }
    setsignUpObj({ ...signUpObj })




  }


  const signUp = (e) => {
    for (let x in signUpObj) {
      if ((signUpObj[x] == undefined || signUpObj[x] == "")) {
        error[x] = "Required*"
      }
      else if (signUpObj[x] && error[x] == "Required*") {
        error[x] = ""
      }


    }
    seterror({ ...error })
    e.preventDefault()
    if (Object.values(error).filter((x) => x != "").length == 0) {
      setsignUpObj({ ...signUpObj })
      dispatch(signup(signUpObj))
      e.target.reset();
      localStorage.setItem('isLogin', true)
      isLogin.setLogin(true)
      isLogin.setuserName(signUpObj.username)
      localStorage.setItem('loginId', JSON.stringify(signUpObj.UserId))
      setsignUpObj({})
      navigate('/')
    }

  }

  return (
    <>
      <div className="registerPage">
        <Box sx={{ position: "absolute", width: "40%", top: "10%", right: "6%" }}>
          <Form onSubmit={signUp} className="signUp p-3 ">
            <legend className='fw-bold'>Sign Up</legend>
            <Form.Label className='fw-bold mt-2'>Email</Form.Label>
            <Form.Control type="email" name="email" onChange={signUpData} />
            <p className='text-danger mt-1'>{error.email}</p>
            <Form.Label className='fw-bold mt-2'>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={signUpData} />
            <p className='text-danger mt-1'>{error.password}</p>
            <Form.Label className='fw-bold mt-2'>Confirm Password</Form.Label>
            <Form.Control type="password" name="cpassword" onChange={signUpData} />
            <p className='text-danger mt-1'>{error.cpassword}</p>
            <button className='primary-btn mt-3 w-100' type='submit'>Sign Up</button>
          </Form>
          <p className='text-center  mt-2'>Already have an account?<NavLink to='/login'><span className='ms-2 text-primary'>Login</span></NavLink></p>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
            <span className='d-inline-block border border-1 border-primary w-25'></span>
            <Typography>OR</Typography>
            <span className='d-inline-block border border-1 border-primary w-25'></span>
          </Box>
          <div className='mt-2 px-3'>
            <div className='btn btn-outline-primary w-100 d-flex align-items-center'><Facebook /><span className='mx-auto'>Continue With Facebook</span></div>
            <div className='btn btn-outline-danger w-100 d-flex align-items-center mt-2'><Google /><span className='mx-auto'>Continue With Google</span></div>
          </div>
        </Box>
      </div>

    </>
  )
}

export default Signup