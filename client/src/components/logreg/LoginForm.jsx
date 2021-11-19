
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Lottie from 'lottie-web';

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const [emailVal, setEmailVal] = useState(false)
    const [pwVal, setPwVal] = useState(false)
    const [emailError, setEmailError] = useState();
    const [pwError, setPwError] = useState();

    const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const frontEndValidation = e => {
        e.preventDefault(); // shouldnt be necessary
        setEmailError();
        setPwError();
        if (e.target.name === "email") {
            setEmail(e.target.value);
            emailRE.test(e.target.value) ? setEmailVal(false) : setEmailVal(true) // confusing reversal
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
            e.target.value.length < 8 ? setPwVal(true) : setPwVal(false)
        }
    }
    const handleLogin = (e, user) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', user)
            .then(res => {
                console.log(res);
                sessionStorage.setItem("userId", res.data.userId);
                navigate('/dashboard');
            })
            .catch(err => {
                console.log("Login error");
                console.log(err.response);
                if (err.response.data.errors.emailError) setEmailError(err.response.data.errors.emailError);
                if (err.response.data.errors.passwordError) setPwError(err.response.data.errors.passwordError);
            })
    }

    const loginAnim = createRef();
    useEffect(() => {
        Lottie.loadAnimation({
            container: loginAnim.current,
            path: "https://assets4.lottiefiles.com/packages/lf20_xlmz9xwm.json"
        })
    }, [])
    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: `1000px` }}>
                <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-green-400 py-10 px-10">
                        <div ref={loginAnim} />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <div className="text-center mb-10">
                            <h1 className="font-extrabold text-4xl text-gray-900 font-megrim">LOGIN</h1>
                            <p>Enter your information to login</p>
                        </div>
                        <form onSubmit={e => handleLogin(e, { email, password })}>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-5">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:email" className={(emailVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="email" onChange={e => { frontEndValidation(e) }} type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500" placeholder="johnsmith@example.com" />
                                    </div>
                                    {emailError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{emailError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-12">
                                    <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                    <div className="flex mb-3">
                                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><Icon icon="mdi:lock" className={(pwVal ? "text-red-400 " : "text-gray-400 ") + "text-lg"} /></div>
                                        <input name="password" onChange={e => { frontEndValidation(e) }} type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500" placeholder="************" />
                                    </div>
                                    {pwError ? 
                                            <div class="alert p-2 alert-warning text-xs">
                                                <div class="flex-1 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                                    </svg>
                                                    <label>{pwError}</label>
                                                </div>
                                            </div> : null}
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3 mb-2">
                                    <button className="block w-full max-w-xs mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold">LOGIN</button>
                                </div>
                            </div>
                            <div className="flex -mx-3">
                                <div className="w-full px-3">
                                    <Link to="/register" className="block w-7/12 max-w-xs mx-auto bg-cyan-300 hover:bg-cyan-500 focus:bg-cyan-500 text-white rounded-lg px-2 py-1 text-xs text-center">Not a user yet?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
