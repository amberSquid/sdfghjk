import { useState, useEfect, useEffect } from 'react'
import { createContext, useContext } from 'react'
import userContext from './contexts/userContext'

// pages import
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import About from './pages/About/index'
import Signup from './pages/Signup/index'
import Dashboard from './pages/Dashboard/index'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState(null)


  useEffect( () => {

    const loggedInUser = localStorage.getItem('user')

    if(loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])


  useEffect( () => {

    if(user != null) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])
  

  return (
    <BrowserRouter>

      <userContext.Provider value={{user, setUser}} >
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
      <Footer />
      </userContext.Provider>

    </BrowserRouter>
  )
}

export default App
