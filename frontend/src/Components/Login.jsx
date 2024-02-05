import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { Context } from '../App'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginData } from '../Store/Slice/LoginUserSlice'


const Login = () => {
    const data = useSelector((state) => state.users)
    let isLogin = useContext(Context)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, seterror] = useState({})
    const [loginObj, setloginObj] = useState({ email: "", password: "" })

    const loginDetails = (e) => {
        if (e.target.value !== "") {
            loginObj[e.target.name] = e.target.value
            setloginObj({ ...loginObj })
            delete error[e.target.name]
        }
        else {
            error[e.target.name] = "Required*"
        }
        seterror({ ...error })
    }

    const login = (e) => {
        for (let x in loginObj) {
            if (loginObj[x] == undefined || loginObj[x] == "") {
                error[x] = "Required*"
            }
            else {
                delete error[x]
            }

        }
        seterror({ ...error })
        e.preventDefault();
        if (Object.keys(error).length == 0) {
            const login = data.find(x => x.email === loginObj.email)
            if (login) {
                if (login.password === loginObj.password) {
                    Swal.fire({
                        title: "Login",
                        text: "Login Successfully.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    loginObj['userId'] = login.UserId
                    e.target.reset()
                    dispatch(loginData(loginObj))
                    setloginObj({})
                    localStorage.setItem('isLogin', true)
                    isLogin.setLogin(true)
                    isLogin.setuserName(login.username)
                    localStorage.setItem('loginId', JSON.stringify(login.UserId))

                    navigate("/")
                }
                else {
                    toast.error("Password Incorrect")
                }
            }
            else {
                toast.error("User Not Found")
            }
        }
    }

    return (
        <div className="loginPage">
            <Box sx={{ position: "absolute", width: "30%", top: "28%", right: "9%" }}>
                <Form className="login p-3  " onSubmit={login} >
                    <legend className='fw-bold'>Login</legend>

                    <Form.Label className='fw-bold mt-2'>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={loginDetails} />
                    <p className='text-danger mt-1'>{error.email}</p>

                    <Form.Label className='fw-bold mt-2'>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={loginDetails} />
                    <p className='text-danger mt-1'>{error.password }</p>
                    <div className='flex items-center justify-between'>
                        <button className='primary-btn mt-3 w-100' type='submit'>Login</button>

                    </div>

                </Form>
                <p className='text-center  mt-2'>Don't have an account?<NavLink to='/signup'><span className='ms-2 text-primary'>Register</span></NavLink></p>
            </Box>
        </div>
    )
}

export default Login