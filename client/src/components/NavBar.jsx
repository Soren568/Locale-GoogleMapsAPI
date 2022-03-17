import React from 'react'
import { Icon } from '@iconify/react';
import { ReactComponent as LOGO } from '../assets/logo.svg'
import { ReactComponent as USER } from '../assets/user.svg'
import { navigate } from '@reach/router';
import axios from 'axios';

const NavBar = props => {

    const handleLogout = () => {
        axios.get('http://localhost:8000/api/logout')
            .then(res => {
                // console.log(res);
                navigate('/login')
            })
    }

    return (
        <div>
            <div className="navbar shadow-lg bg-neutral text-neutral-content">
                <div className="flex-none hidden lg:flex">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex-1 hidden px-2 mx-2 md:flex " >
                    <LOGO className="mr-3 cursor-pointer" onClick={e => navigate("/dashboard")} />
                    <span className="text-4xl font-bold font-megrim cursor-pointer" onClick={e => navigate("/dashboard")}>
                        Locale
                    </span>
                </div>
                <div className="justify-end lg:flex-none">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-ghost" />
                    </div>
                </div>
                <div className="mr-3">
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-cyan px-2 hover:text-red-400" onClick={e => handleLogout(e)}>
                            <Icon icon="heroicons-outline:logout" className="text-2xl p-0 "></Icon>
                        </button>
                    </div>
                    <div className="flex-none">
                        <div className="avatar">
                            <div className="rounded-full  w-10 h-10 m-1">
                                {props.activeUser === 'guest' ? (
                                    <USER className="cursor-not-allowed opacity-50" onClick={e => alert("Please log in or register to access the account page")} />
                                ) : (
                                    <USER onClick={e => navigate("/account")} className="cursor-pointer" />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
