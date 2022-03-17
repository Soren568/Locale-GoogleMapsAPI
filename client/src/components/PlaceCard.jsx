import React, { useState } from 'react'
import { Dialog } from '@headlessui/react';

const PlaceCard = ({ recArea, open, setOpen, setModalLocation, selected, refProp, hovered }) => {
    const handleModal = (e) => {
        e.preventDefault();
        setModalLocation(recArea);
        setOpen(true);
    }

    if (selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    // if (hovered) console.log("This element was hovered over: ", recArea.RecAreaName);
    return (
        <>
            <div className={hovered ? "max-h-full border-opacity-60 rounded-box m-4 border-4 border-green-400 bg-green-500 transition-all" : "max-h-full border-opacity-60 rounded-box m-4 border-2 border-gray-400 transition-all"}>
                {recArea.MEDIA.length > 0 && recArea.MEDIA[0].MediaType != "Video" ?
                    <img class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-box" src={recArea.MEDIA.length > 1 ? recArea.MEDIA[1].URL : recArea.MEDIA[0].URL} alt="blog" />
                    : null}
                <div className={recArea.MEDIA.length > 0 ? (hovered ? "p-6 bg-green-100 rounded-b-box" : "p-6 bg-base-200 rounded-b-box") : (hovered ? "p-6 bg-green-100 rounded-box" : "p-6 bg-base-200 rounded-box")}>
                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">RECREATION AREA</h2>
                    <h1 className="title-font text-xl font-medium mb-3">{recArea.RecAreaName}</h1>
                    <p className="leading-relaxed mb-3 max-h-24 overflow-y-scroll">{recArea.RecAreaDescription.includes("<") || recArea.RecAreaDescription.includes("href") ? null : recArea.RecAreaDescription}</p>
                    <div className="flex items-center flex-wrap justify-between">
                        <a onClick={e => handleModal(e)} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer hover:text-cyan-400 transition-all">Learn More
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <div>
                            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>1.2K
                            </span>
                            <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                                <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>6
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceCard
