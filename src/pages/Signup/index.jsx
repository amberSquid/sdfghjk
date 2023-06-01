import { useState, useEffect, useNaviagate } from "react";
import {} from "react-router-dom"
import axios from "axios";
import validator from "validator";
import {toast} from "react-toastify"

export default function Signup() {

    // const navigate = useNaviagate()

    function verify() {
        // verify all signup states and show error messages using validator
        if (!validator.isEmail(formData.email)) {
            toast.error("Please enter a valid email address")
            return false
        }
        if (!formData.password) {
            toast.error("Please enter a password")
            return false
        }
        if (!formData.confirmPassword) {
            toast.error("Please confirm your password")
            return false
        }
        if (formData.password!== formdata.confirmPassword) {
            toast.error("Passwords do not match")
            return false
        }
        return true
    }

    useEffect( () => {
        const endpoint = "https://restcountries.com/v3.1/all?fields=demonyms"

        fetch(endpoint)
        .then( (res) => res.json())
        .then( data =>  {
            console.log(data)

            var nats = data.map( (data, index) => {
                return data.demonyms.eng.m
            })

            //sort nats array pf strings by alphabetical order and remove duplicates
            nats.sort()
            nats = [...new Set(nats)]
            console.log(nats)

            console.log(nats)
            setNationality(nats)

        })

        
    }, [])

    const [nationality, setNationality] = useState(null)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        nationality: "",
        email: "",
        password: "",
        confirm_password: "",
    })

    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        nationality: "",
        email: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        console.log(formData)

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        var res = verify()

        if(res == false) return
            e.preventDefault()

            const endpoint = "http://localhost:3000/register"
            await axios.post(endpoint, formData, (response, err) => {
                console.log(response)
                localStorage.setItem('user', JSON.stringify(response))
                if(err) {
                    console.log(err)
                }
            })

            // toast.success("User logged in successfully!")
            // navigate('/login')

    }





    return(

        <div className="grid grid-cols-2">

        <div action="" className="p-6  border">
            <h1 className="text-3xl uppercase mb-4">Signup</h1>

            <p className="mb-6">Welcome! We glad to have you join us. <br />To get started please complete the form below.</p>
            <div className=" grid grid-cols-2 gap-y-4 ">
                <div className="form-control">
                    <label htmlFor="first_name">First Name</label>
                    <input 
                        type="text"
                        placeholder="Dylan"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div className="form-control">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="last_name" 
                        placeholder="Enter last_name" 
                        id="last_name" 
                        name="last_name"
                        value={formData.last_name}   
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" 
                        placeholder="example@gmail.com" 
                        id="email" 
                        name="email"
                        value={formData.email}   
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input type="date" 
                        // placeholder="Enter Password" 
                        id="date" 
                        name="dob"
                        value={formData.date}   
                        onChange={handleChange}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="gender">Gender</label>

                    <select name="gender" id="gender" onChange={handleChange}>
                        <option value="Male">Male</option>    
                        <option value="Male">Female</option>    
                    </select> <br />
                   
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="password">Nationality</label>

                    <select name="nationality" id="" onChange={handleChange}>
                        {
                            nationality?.map( (nats, index) => {
                                return <option value={nats} key={index}>{nats}</option>
                            })
                        }  
                    </select> <br />
                   
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="password">Password</label>

                    <input type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}

                    />
                   
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                </div>

                <div className="form-control">
                    <label htmlFor="confirmpassword">Confirm Password</label>

                    <input type="password"
                    name="confirm_password"
                    id="confirmpassword"
                    value={formData.confirm_password}
                    onChange={handleChange}

                    />
                   
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                </div>
                



                
           </div>

           <button
                    className="text-white font-bold uppercase bg-orange-600 px-4 py-2 rounded hover:bg-orange-500 hover:text-purple-900 transition mt-4"
                    onClick={handleSubmit}
                >
                    SignUp
                </button>
        </div>

        <img src="https://images.pexels.com/photos/2417863/pexels-photo-2417863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full hidden md:block"/>
    </div>
    )

    
}