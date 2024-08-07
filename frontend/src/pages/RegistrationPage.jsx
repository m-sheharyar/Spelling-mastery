import React, {useContext} from "react";
import { Link } from "react-router-dom";
import spellingLogo from '../assets/images/logo/spellingLogo.png'
import AuthContext from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const BASE_URL = import.meta.env.VITE_API_URL


const RegistrationPage = () => {
    let [emailError, setEmailError] = useState(null)
    let [passwordError, setPasswordError] = useState(null)
    const {setSuccessMessage} = useContext(AuthContext)
    let navigate = useNavigate()

    let registration = async (event) => {
        event.preventDefault()
        console.log("registring user")
        let response = await fetch(`${BASE_URL}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": event.target.email.value,
                "name": event.target.name.value,
                "password": event.target.password.value,
                "password2": event.target.password2.value,
                "tc": "True"
            })
        })

        let data = await response.json()
        console.log(data)

        if(response.status === 201) {
            navigate("/login")
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
            }, 5000)
        } else if (data?.email) {
            setEmailError(data.email[0])
            setPasswordError(null)
        } else if (data?.non_field_errors) {
            setPasswordError(data.non_field_errors[0])
            setEmailError(null)
        }

    }
    return (
       <>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={spellingLogo} alt="Spelling Mastery logo" />
                        Spelling Mastery
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={registration}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>} {/* Email error message */}
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>} {/* Password error message */}

                            </div>
                            <div>
                                <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="password" name="password2" id="password2" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>} {/* Password error message */}

                            </div>
                            <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            name="tc" 
                                            value="True" 
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                     />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                                            I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                                        </label>
                                    </div>
                                </div>
                            <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
};

export default RegistrationPage;
