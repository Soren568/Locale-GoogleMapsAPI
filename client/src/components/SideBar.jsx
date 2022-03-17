import React, { createRef, useEffect, useState } from 'react'
import PlaceCard from './PlaceCard';

const SideBar = ({ recAreas, setOpen, open, setModalLocation, childClicked, childHovered }) => {
    // console.log({ childHovered });
    const [elRefs, setElRefs] = useState();

    // TO DO: 'Cannot read properties of undefined reading '0'
    // useEffect(() => {
    //     if (recAreas) {
    //         console.log({ recAreas })
    //         const refs = Array(recAreas.length).fill().map((_, i) => elRefs[i] || createRef())
    //         console.log(refs)
    //         setElRefs(refs)
    //     }

    //     // console.log({ elRefs })
    //     // console.log({ recAreas })
    // }, [recAreas])
    return (
        <span className="max-h-screen min-h-screen overflow-y-scroll bg-neutral">
            {
                recAreas ? (
                    recAreas.map((recArea, i) => {
                        // console.log({ elRefs })
                        return (
                            <div key={i}>
                                <PlaceCard
                                    recArea={recArea}
                                    setOpen={setOpen}
                                    open={open}
                                    setModalLocation={setModalLocation}
                                    selected={Number(childClicked) === i}
                                    hovered={Number(childHovered) === i}
                                // refProp={elRefs[i]}
                                />
                            </div>)
                    }
                    )
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
