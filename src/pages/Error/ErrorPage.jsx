import React from 'react'
import foxSvg from "../../assets/fox-svgrepo-com.png"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className="h-screen w-screen bg-gray-100 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div className="max-w-md">
                        <div className="text-5xl font-dark font-bold mb-5">Access Denied</div>
                        <p className="text-2xl md:text-3xl font-light leading-normal mb-5 pr-10">You need to login to view this page.</p>
                        <p className="mb-8">Click the button below to go back to the login page.</p>
                        <Link to="/">
                            <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">Login Page</button>
                        </Link>
                    </div>
                    <div className="max-w-lg">
                        <img width={300} src={foxSvg}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage