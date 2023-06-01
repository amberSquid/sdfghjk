import { useState } from "react"
import {toast} from "react-toastify"
import axios from "axios"

import validator from "validator"

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        console.log(formData)

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function verify() {
        if (validator.isEmpty(formData.email)) {
            setErrors({
              ...errors,
                email: 'Email is required'
            })
        } else if (!validator.isEmail(formData.email)) {
            setErrors({
              ...errors,
                email: 'Email is invalid'
            })
        } else {
            setErrors({
              ...errors,
                email: ''
            })
        }

        if(validator.isEmpty(formData.password)) {
            setErrors({
             ...errors,
                password: 'Password is required'
            })
        }else {
            setErrors({
            ...errors,
                password: ''
            })
        }
    }

    const handleSubmit = async (e) => {
        verify()
        // console.log("HELLO WORLD")
        // e.preventDefault()
        const endpoint = "http://localhost:3000/login"

        await axios.post(endpoint, formData, (response, errors) => {
            console.log("Dylan")
            console.log(response)
            console.log(errors)
            
        })

        console.log("CLICKED")
    }
    return(
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
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" 
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

            <img src="https://images.pexels.com/photos/2417863/pexels-photo-2417863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full hidden md:block object-contain"/>
        </div>
    )
}