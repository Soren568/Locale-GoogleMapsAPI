import React, { createRef, useEffect, useState } from 'react'
import PlaceCard from './PlaceCard';

const SideBar = ({ recAreas, setOpen, open, setModalLocation, childClicked, childHovered }) => {
    console.log({ childHovered });
    const [elRefs, setElRefs] = useState();

    useEffect(() => {
        if (recAreas) {
            const refs = Array(recAreas.length).fill().map((item, i) => elRefs[i] || createRef())
            setElRefs(refs)
            console.log(refs)
            console.log(elRefs)
        }

    }, [recAreas])
    return (
        <span className="max-h-screen min-h-screen overflow-y-scroll bg-neutral">
            {
                recAreas ? (
                    recAreas.map((recArea, i) =>
                        <div key={i} ref={elRefs[i]}>
                            <PlaceCard 
                                recArea={recArea} 
                                setOpen={setOpen} 
                                open={open} 
                                setModalLocation={setModalLocation} 
                                selected={Number(childClicked) === i} 
                                hovered={Number(childHovered) === i}
                                refProp={elRefs[i]} />
                        </div>)
                ) : (
                    <div>
                        <h1 className="text-2xl text-gray-500 font-semibold text-center font-megrim grid place-items-center max-h-screen min-h-screen w-full">No nearby facilities...</h1>
                    </div>
                )
            }
        </span>
    )
}

export default SideBar
