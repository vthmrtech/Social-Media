import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Requests from './Components/Requests';
import Login from './Components/Login';
import Signup from './Components/Signup';
import OnBoarding from './Components/OnBoarding';
import { useSelector } from 'react-redux';
import BlockList from './Components/BlockList';
export let Context = createContext()

function App() {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("isLogin")))
  const allUsers = useSelector((state) => state.users)
  const [loginId, setloginId] = useState(JSON.parse(localStorage.getItem("loginId")))
  const [loginUser, setloginUser] = useState(allUsers.find((x) => x.UserId == loginId) || {})
  const [userName, setuserName] = useState(loginUser?.username)

  useEffect(() =>{
    if(!login || (login!==true && login !== false)){
      localStorage.setItem('isLogin', false)
      
    }
  },[])
  
  return (
    <>
      <Toaster />
      <Context.Provider value={{ login, setLogin, setuserName , userName}}>
        <BrowserRouter>
          <Routes>
            {
              login === false
                ?
                <>
                  <Route path='/' element={<Navigate to="/login" />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                </>
                :
                <>


                  <Route path='/' element={<Navigate to="/home" />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/home' element={<Home />} />
                  <Route path='/blocklist' element={<BlockList />} />
                  <Route path='/requests' element={<Requests />} />
                  <Route path='/onboarding' element={<OnBoarding />} />



                </>
            }
            <Route path='*' element={<Navigate to="/" />} />

          </Routes>
        </BrowserRouter>

      </Context.Provider>
    </>
  );
}

export default App;
