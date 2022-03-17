import React, { useEffect } from 'react'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Icon } from '@iconify/react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import { checkInFavorites, checkInStarred } from '../utils/favStarCheck';


const Modal = props => {
    const { open, setOpen, modalLocation, isFavorite, setIsFavorite, isStarred, setIsStarred, activeUser } = props
    const cancelButtonRef = useRef(null);
    // console.log(modalLocation);

    // Check if location in favorites or starred on modal open
    useEffect(() => {
        // console.log("activeUser.favorited: ", activeUser.favorited)
        if (activeUser === 'guest') return
        setIsFavorite(checkInFavorites(modalLocation.RecAreaID, activeUser.favorited))
        setIsStarred(checkInStarred(modalLocation.RecAreaID, activeUser.starred))
    }, [open])

    const handleFavorite = e => {
        e.preventDefault();
        if (isFavorite === true) {
            axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/removefavstar', { favorited: { recId: modalLocation.RecAreaID } }, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setIsFavorite(false);
                })
                .catch(err => console.log(err))
        } else {
            axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/addfavstar', { favorited: { recId: modalLocation.RecAreaID, recAddress: `${modalLocation.RECAREAADDRESS[0].RecAreaStreetAddress1}, ${modalLocation.RECAREAADDRESS[0].City}, ${modalLocation.RECAREAADDRESS[0].AddressStateCode} ${modalLocation.RECAREAADDRESS[0].PostalCode}`, recName: modalLocation.RecAreaName } }, { withCredentials: true })
                .then(res => {
                    console.log("like success", res);
                    setIsFavorite(true)
                })
                .catch(err => console.log(err))
        }
    }
    const handleStar = e => {
        e.preventDefault();
        if (isStarred === true) {
            axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/removefavstar', { starred: { recId: modalLocation.RecAreaID } }, { withCredentials: true })
                .then(res => {
                    console.log(res);
                    setIsStarred(false);
                })
                .catch(err => console.log(err))
        } else {
            axios.put('http://localhost:8000/api/users/' + sessionStorage.getItem("userId") + '/addfavstar', { starred: { recId: modalLocation.RecAreaID, recAddress: `${modalLocation.RECAREAADDRESS[0].RecAreaStreetAddress1}, ${modalLocation.RECAREAADDRESS[0].City}, ${modalLocation.RECAREAADDRESS[0].AddressStateCode} ${modalLocation.RECAREAADDRESS[0].PostalCode}`, recName: modalLocation.RecAreaName } }, { withCredentials: true })
                .then(res => {
                    console.log("bookmark success", res);
                    setIsStarred(true)
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">

                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left cursor-default">
                                        <Dialog.Title as="h3" className="text-2xl leading-6 font-bold text-gray-900 mb-5 flex justify-between">
                                            {modalLocation.RecAreaName}
                                            <div className="flex ">
                                                {activeUser === 'guest' ? (
                                                    <>
                                                        <Icon icon="ant-design:star" className="text-gray-500 transition-colors duration-500 cursor-pointer ml-3" onClick={e => alert("Please login or register to save locations")} />
                                                        <Icon icon="carbon:favorite" className="text-gray-500 transition-colors duration-500 cursor-pointer ml-3" onClick={e => alert("Please login or register to save locations")} />
                                                    </>
                                                ) : (
                                                    <>
                                                        <Icon icon={isStarred ? "ant-design:star-filled" : "ant-design:star"} onClick={e => handleStar(e)} className={isStarred ? "text-yellow-400 transition-colors duration-500 cursor-pointer ml-3 text-2xl" : "text-gray-500 transition-colors duration-500 cursor-pointer ml-3"} />
                                                        <Icon icon={isFavorite ? "carbon:favorite-filled" : "carbon:favorite"} onClick={e => handleFavorite(e)} className={isFavorite ? "text-red-400 transition-colors duration-500 cursor-pointer ml-3 text-2xl" : "text-gray-500 transition-colors duration-500 cursor-pointer ml-3"} />
                                                    </>
                                                )}
                                            </div>
                                        </Dialog.Title>
                                        <div className="flex mt-1 items-center mb-5 flex-wrap select-none">
                                            <span className="font-semibold ">Activities:</span>
                                            {modalLocation.ACTIVITY.length > 0 ? modalLocation.ACTIVITY.map((activity, i) => (
                                                <span key={i} className="text-2xs mx-2 my-1">{activity.RecAreaActivityDescription !== '' ? activity.RecAreaActivityDescription : activity.ActivityName}, </span>
                                            )) : null}
                                        </div>
                                        <div>
                                            <h1 className="font-semibold">Location Info:</h1>
                                            <div>
                                                <ul className="text-sm pl-5 cursor-default">
                                                    <li> <span className="tracking-wider uppercase text-gray-500 text-xs">Address:</span> {modalLocation.RECAREAADDRESS.length > 0 ? `${modalLocation.RECAREAADDRESS[0].RecAreaStreetAddress1}, ${modalLocation.RECAREAADDRESS[0].City}, ${modalLocation.RECAREAADDRESS[0].AddressStateCode} ${modalLocation.RECAREAADDRESS[0].PostalCode}` : null}</li>
                                                    <li> <span className="tracking-wider uppercase text-gray-500 text-xs">Phone:</span> {modalLocation.RecAreaPhone != '' ? modalLocation.RecAreaPhone : <span className="text-2xs text-gray-600">N/A. Please see site if available.</span>}</li>
                                                    {modalLocation.RecAreaEmail ? <li> <span className="tracking-wider uppercase text-gray-500 text-xs">Email:</span> {modalLocation.RecAreaEmail}</li> : null}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="mt-2 mb-5">
                                            <h1 className="font-semibold">Description: </h1>
                                            <p className="text-sm text-gray-500 pl-5 cursor-default">
                                                {modalLocation.RecAreaDescription ? (modalLocation.RecAreaDescription.includes(">") || modalLocation.RecAreaDescription.includes("<") ? <span dangerouslySetInnerHTML={{ __html: modalLocation.RecAreaDescription }}></span> : modalLocation.RecAreaDescription) : "Sorry no description to display"}
                                            </p>
                                        </div>
                                        {modalLocation.LINK?.length > 0 ? (
                                            <div>
                                                <h1 className="font-semibold tracking-wider text-gray-700 text-xs">Related Links:</h1>
                                                <div>
                                                    <ul className="text-xs">
                                                        {modalLocation.LINK.map((link, i) => (
                                                            <li className="flex justify-between"> <span onClick={e => { navigate(link.URL); setOpen(false) }} className="tracking-wider uppercase text-gray-500 text-2xs underline hover:text-cyan-500 transition-all cursor-pointer">{link.Title != '' ? link.Title : link.LinkType}</span></li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {/* <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white bg-cyan-400 hover:bg-cyan-500 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm transition-all"
                                    onClick={() => setOpen(false)}
                                >
                                    Go to Website
                                </button> */}
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
