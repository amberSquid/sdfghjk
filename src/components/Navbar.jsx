import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"


export default function Navbar() {

    const navlinks = ['Home', 'Apartments', 'Villas', 'Hotels', 'About', 'Contact US']
    const navigate = useNavigate()

    const navs = navlinks.map( (link, index) => {
        return (
            <NavLink key={index} to={'/'+link} className="text-sm text-slate-700 active:text-blue-500">{link}</NavLink>
        )
    })

    return (
        <nav className="bg-white flex h-16 items-center justify-between px-4 py-2">
            <a href="/">
            <img src="/logo.png" alt="" width="70px"/>
            </a>

            <div className="space-x-4 uppercase">
                {navs}
            </div>

            <div className="space-x-4">
                <button className="px-4 py-2 rounded-lg text-white uppercase bg-orange-600 hover:bg-orange-800 transition"
                    onClick={() => navigate("/login")}
                >Login</button>
                <button className="px-4 py-2 rounded-lg text-orange-600 uppercase ring-orange-600 ring hover:bg-orange-800 transition hover:ring-0 hover:text-white"
                    onClick={() => navigate("/signup")}
                >Signup</button>
            </div>
        </nav>
    )
}