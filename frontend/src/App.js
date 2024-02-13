import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
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
  const loginUser = useSelector((state) => state.users.data)
  const [userName, setuserName] = useState(loginUser?.username)

  const navigate = useNavigate()
  useEffect(() =>{
    if(!login || (login!==true && login !== false)){
      navigate('/login')  
      localStorage.setItem('isLogin', false)
    }
    setuserName(loginUser.username)
  },[])
  
  return (
    <>
      <Toaster />
      <Context.Provider value={{ login, setLogin, setuserName , userName}}>
        
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

      </Context.Provider>
    </>
  );
}

export default App;
