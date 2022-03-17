import React, { useState, useEffect, useRef, createRef } from 'react'
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';
import NavBar from '../components/NavBar';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import Modal from '../components/Modal';
import { navigate } from '@reach/router';

const UserPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [allFavorites, setAllFavorites] = useState();
    const [allStarred, setAllStarred] = useState();
    const [domChange, setDomChange] = useState(false);
    const [activeUser, setActiveUser] = useState();
    const [open, setOpen] = useState(false);
    const [modalLocation, setModalLocation] = useState();
    const [isStarred, setIsStarred] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const userContainer = useRef(null)

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `

    useEffect(() => {
        if (sessionStorage.getItem("userId") === 'guest') navigate('/dashboard')
        axios.get('/api/users/' + sessionStorage.getItem("userId"), { withCredentials: true })
            .then(res => {
                console.log(res);
                setActiveUser(res.data.user);
                setAllFavorites(res.data.user.favorited);
                setAllStarred(res.data.user.starred);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err)
            })
    }, [domChange])

    const handleGet = e => {
        if (sessionStorage.getItem("userId") === 'guest') navigate('/dashboard')
        e.preventDefault();
        axios.get("/api/users", { withCredentials: true })
            .then(res => {
                console.log(res);
                setDomChange(prev => !prev)
            })
            .catch(err => console.log(err))
    }
    const deleteFavorites = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/users/" + sessionStorage.getItem("userId"), { favorited: [] }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setDomChange(prev => !prev)
            })
            .catch(err => console.log(err))
    }

    const handleLocationClick = (recId) => {
        axios.post('http://localhost:8000/api/rec/singleGet', { recId: recId })
            .then(res => {
                console.log(res);
                setModalLocation(res.data);
                console.log(modalLocation);
                setOpen(true);
            })
            .catch(err => console.log(err))
    }

    const removeFavorited = (recId) => {
        axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/removefavstar', { favorited: { recId: recId } }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setDomChange(prev => !prev);
            })
            .catch(err => console.log(err))
    }
    const removeStarred = (recId) => {
        axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/removefavstar', { starred: { recId: recId } }, { withCredentials: true })
            .then(res => {
                console.log(res);
                setDomChange(prev => !prev);
            })
            .catch(err => console.log(err))
    }

    return (
        loaded ? (
            <>
                <div className="h-screen w-full bg-neutral">
                    <NavBar />
                    {open ? <Modal
                        open={open}
                        setOpen={setOpen}
                        modalLocation={modalLocation}
                        isFavorite={isFavorite}
                        setIsFavorite={setIsFavorite}
                        isStarred={isStarred}
                        setIsStarred={setIsStarred}
                        activeUser={activeUser} /> : null}
                    <div className="grid max-h-screen min-h-screen grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 text-gray-200 bg-neutral">
                        <div className="col-span-1 flex flex-col items-center p-5">
                            <Player ref={userContainer} src="https://assets6.lottiefiles.com/private_files/lf30_qunyZE.json" autoplay={true} onClick={e => userContainer.current.play()} style={{ height: '200px', width: '200px' }} className="mask-squircle" />
                            {/* <div style={{width:'200px', height: '200px'}} ref={userContainer} className="mask-circle z-40" onMouseEnter={e => playAnimation(e)}></div> */}
                            <p className="text-2xl font-megrim font-extrabold mt-3">
                                {activeUser.firstName} {activeUser.lastName}
                            </p>
                            <button className="btn btn-cyan" onClick={e => handleGet(e)}>Get authorized request</button>
                            <button className="btn btn-cyan" onClick={e => deleteFavorites(e)}>Delete All Favorites</button>

                            {/* <button className="btn btn-cyan" onClick={e => deleteAccount(e)}>Delete Account</button> */}
                        </div>
                        <div className="col-span-3 p-6 flex flex-col">
                            <div className="flex flex-col mb-10 ">
                                <p className="text-2xl font-megrim font-extrabold mt-3">Favorites: </p>
                                <ul className="mt-3 border border-gray-500 p-4 h-48 overflow-y-auto rounded-l-lg">
                                    {
                                        allFavorites?.map((fav, i) =>
                                            <li key={i} className="mb-5 flex items-center" >
                                                <Icon icon="clarity:remove-line" className="text-red-300 mr-4 cursor-pointer hover:text-lg transition-all" onClick={e => removeFavorited(fav.recId)} />
                                                <span onClick={e => handleLocationClick(fav.recId)} className="cursor-pointer"> {fav.recName} - {fav.recAddress} </span>
                                            </li>)
                                    }

                                </ul>
                            </div>
                            <div className="flex flex-col ">
                                <p className="text-2xl font-megrim font-extrabold mt-3">Starred:</p>
                                <ul className="mt-3 border border-gray-500 rounded-l-lg p-4 h-48 overflow-y-auto">
                                    {
                                        allStarred?.map((starred, i) =>
                                            <li key={i} className="mb-5 flex items-center">
                                                <Icon icon="clarity:remove-line" className="text-red-300 mr-4 hover:text-lg cursor-pointer" onClick={e => removeStarred(starred.recId)} />
                                                <span onClick={e => handleLocationClick(starred.recId)} className="cursor-pointer">{starred.recName} - {starred.recAddress}</span>
                                            </li>)
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="h-screen w-screen bg-gray-800 grid place-items-center">
                    <PulseLoader color="#EF3800" loaded={true} size={40} margin={2} css={override} />
                    <span className="text-gray-400 font-megrim">Loading account page - please wait...</span>
                </div>
            </>
        )
    )
}

export default UserPage
