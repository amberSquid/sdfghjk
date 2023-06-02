import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"

import validator from "validator"

export default function Login() {
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

 function verify() {
  const newErrors = {}

  if (validator.isEmpty(formData.email)) {
    newErrors.email = 'Email is required'
  } else if (!validator.isEmail(formData.email)) {
    newErrors.email = 'Email is invalid'
  } else {
    // Clear the error for the email field when it is valid
    newErrors.email = ''
  }

  if (validator.isEmpty(formData.password)) {
    newErrors.password = 'Password is required'
  } else {
    // Clear the error for the password field when it is valid
    newErrors.password = ''
  }

  setErrors({
    ...errors,
    ...newErrors
  })

  // Check if there are any errors
  const isValid = Object.values(newErrors).every(error => error === '')
  return isValid
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!verify()) {
        console.log("Form is invalid or incomplete")
        return
    }

    const endpoint = "http://localhost:3000/api/users/login"

    try {
      const response = await axios.post(endpoint, formData)
      const userData = response.data

      // Store the user data in local storage
      localStorage.setItem('userData', JSON.stringify(userData))

      toast.success("User logged in successfully")
      navigate('/dashboard')
      console.log("Login successful")
      console.log(userData)

      // Display success message or redirect to another page
    } catch (error) {
      console.error("Error during login:", error)
      toast.error("Invalid Credentials")
      // Display error message
    }
  }

  return (
    <div className="grid grid-cols-2 h-screen overflow-hidden">
      <div action="" className="p-6 max-w-[400px] mx-auto">
        <h1 className="text-3xl uppercase">Login</h1>

        <p className="mb-3">Glad to have you back! Please login to continue exploring Qatar.</p>
        <div className="space-y-4">
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            className="text-orange-500 font-bold uppercase bg-purple-900 px-4 py-2 rounded hover:bg-orange-500 hover:text-purple-900 transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>

      <img src="https://images.pexels.com/photos/2417863/pexels-photo-2417863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full hidden md:block object-contain" />
    </div>
  )
}
