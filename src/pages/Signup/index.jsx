import { useState, useEffect } from "react";
import axios from "axios";
import validator from "validator";
import { toast } from "react-toastify";

export default function Signup() {
  const [nationality, setNationality] = useState([]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    nationality: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    nationality: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    const endpoint = "https://restcountries.com/v3.1/all?fields=demonyms";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const nats = data.map((data) => data.demonyms.eng.m);
        const uniqueNats = [...new Set(nats)].sort();
        setNationality(uniqueNats);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const verify = () => {
    const newErrors = {};
    if (!validator.isEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Please enter a password";
    }
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    }
    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors({
      ...errors,
      ...newErrors,
    });

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = verify();
    if (!isValid) return;

    const endpoint = "http://localhost:3000/api/users/register";
    try {
      const response = await axios.post(endpoint, formData);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("User registered successfully!");
      // Redirect to login page or any other page you want
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div action="" className="p-6 border">
        <h1 className="text-3xl uppercase mb-4">Signup</h1>
        <p className="mb-6">
          Welcome! We are glad to have you join us. To get started, please
          complete the form below.
        </p>
        <div className="grid grid-cols-2 gap-y-4">
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
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              placeholder="Enter last_name"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="dob">Date Of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && (
              <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="gender">Gender</label>
            <select name="gender" id="gender" onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="nationality">Nationality</label>
            <select name="nationality" id="nationality" onChange={handleChange}>
              {nationality.map((nat, index) => (
                <option value={nat} key={index}>
                  {nat}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password}
              </p>
            )}
          </div>
        </div>

        <button
          className="text-white font-bold uppercase bg-orange-600 px-4 py-2 rounded hover:bg-orange-500 hover:text-purple-900 transition mt-4"
          onClick={handleSubmit}
        >
          SignUp
        </button>
      </div>

      <img
        src="https://images.pexels.com/photos/2417863/pexels-photo-2417863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-full hidden md:block"
      />
    </div>
  );
}
