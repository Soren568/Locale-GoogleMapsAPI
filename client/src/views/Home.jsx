import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react';
import { Dialog } from '@headlessui/react';
import GridLoader from 'react-spinners/GridLoader';

import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Map from '../components/Map/Map';
import axios from 'axios';
import Modal from '../components/Modal';
import UserDrawer from '../components/UserDrawer';

const Home = () => {
    // Miscellaneous
    const [darkMode, setDarkMode] = useState(false);
    const [userDrawer, setUserDrawer] = useState(false);

    // User info
    const [activeUser, setActiveUser] = useState();
    const [allFavorites, setAllFavorites] = useState(false);
    const [allStarred, setAllStarred] = useState()

    // Api requests info
    const [coords, setCoords] = useState();
    const [bounds, setBounds] = useState();
    const [recAreas, setRecAreas] = useState();
    
    // Modal and Location info
    const [open, setOpen] = useState(false);
    const [modalLocation, setModalLocation] = useState();
    const [isStarred, setIsStarred] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [childClicked, setChildClicked] = useState();
    const [childHover, setChildHover] = useState();
    
    const earthRadius = 6378.8;

    // Reset like and starred state on modal close
    useEffect(() => {
        if(open == false){
            setIsFavorite(false);
            setIsStarred(false);
        }
    }, [open])

    // Get user info
    useEffect(() => {
        axios.get('http://localhost:8000/api/users/' + sessionStorage.getItem("userId"), {withCredentials: true})
            .then(res => {
                // console.log(res);
                setActiveUser(res.data.user);
                setAllFavorites(res.data.user.isFavorite);
                setAllStarred(res.data.user.isStarred)
            })
            .catch(err => {
                console.log(err)
            })
    }, [isFavorite, isStarred])

    // Get the users current location on page load
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({ lat: Number(position.coords.latitude), lng: Number(position.coords.longitude) })
            // console.log({bounds})
        })
    }, [])

    // Calculate the radius of the current map bounds => make the api request to Recreation.gov (max 25mi. radius)
    useEffect(() => {
        if (bounds) {
            // console.log({coords}, {bounds})
            let centerLatRadians = (coords.lat / 57.2958);
            let centerLngRadians = (coords.lng / 57.2958);
            let neLatRadians = (bounds.ne.lat / 57.2958);
            let neLngRadians = (bounds.ne.lng / 57.2958);
            const kmRadius = earthRadius * Math.acos(
                Math.sin(centerLatRadians) * Math.sin(neLatRadians) + Math.cos(centerLatRadians)
                * Math.cos(neLatRadians) * Math.cos(neLngRadians - centerLngRadians)
            )
            var mileRadius = kmRadius * 0.6213711999983
            // console.log("Mile radius: ", mileRadius)
            if (mileRadius > 25) mileRadius = 25;

            axios.post('http://localhost:8000/api/rec', { coords: coords, mileRadius: mileRadius })
                .then(res => {
                    // console.table(res.data);
                    setRecAreas(res.data.recareas.RECDATA);
                })
                .catch(err => console.log(err))
        }
    }, [bounds])
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `
    return (
        coords ? (
            <>
                <div className="h-screen w-screen">
                    {/* {userDrawer ? <UserDrawer userDrawer={userDrawer} setUserDrawer={setUserDrawer} /> : null} */}
                    {open ? <Modal 
                        open={open} 
                        setOpen={setOpen} 
                        modalLocation={modalLocation} 
                        isFavorite={isFavorite} 
                        setIsFavorite={setIsFavorite} 
                        isStarred={isStarred} 
                        setIsStarred={setIsStarred} 
                        activeUser={activeUser} /> : null}
                    <NavBar/>
                    <div className="grid max-h-full grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        <SideBar 
                            className="col-span-1 lg:col-span-2 xl:col-span-1 bg-gray-700" 
                            recAreas={recAreas} 
                            setOpen={setOpen} 
                            open={open} 
                            setModalLocation={setModalLocation} 
                            childClicked={childClicked}
                            childHovered={childHover}/>
                        <div className="col-span-2 bg-base-300 md:col-span-2 lg:col-span-3 xl:col-span-auto">
                            <Map
                                coords={coords}
                                setCoords={setCoords}
                                bounds={bounds}
                                setBounds={setBounds}
                                recAreas={recAreas}
                                darkMode={darkMode}
                                setChildClicked={setChildClicked}
                                childClicked={childClicked}
                                activeUser={activeUser}
                                setChildHover={setChildHover}
                            />
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className="h-screen w-screen bg-gray-800 grid place-items-center">
                    <GridLoader color="#04dbdb" loading={true} size={30} margin={2} css={override} />
                    <span className="text-gray-400 font-megrim">Loading location - please wait...</span>
                </div>
            </>
        )
    )
}

export default Home
