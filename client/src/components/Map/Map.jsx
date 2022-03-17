import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';
import { Icon } from '@iconify/react';
import { navigate } from '@reach/router';

const Map = ({ coords, setCoords, setBounds, recAreas, darkMode, setChildClicked, activeUser, setChildHover }) => {
    const [home, setHome] = useState();
    // console.log({ recAreas })
    useEffect(() => {
        setHome({ lat: coords.lat, lng: coords.lng })
        if (typeof activeUser === 'undefined') {
            navigate('/login')
        }
    }, []);

    const placeInFavorites = (recId) => {
        // console.log({ activeUser })
        if (activeUser === 'guest' || typeof activeUser === 'undefined') return false
        for (let i = 0; i < activeUser.favorited.length; i++) {
            if (activeUser.favorited[i]["recId"] === recId) {
                return true
            }
        }
    }
    const placeInStarred = (recId) => {
        if (activeUser === 'guest' || typeof activeUser === 'undefined') return false
        for (let j = 0; j < activeUser.starred.length; j++) {
            // console.log("In for loop")
            if (activeUser.starred[j]["recId"] == recId) {
                return true
            }
        }
    }
    return (
        <div className="h-full w-full">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GM_KEY }}
                defaultCenter={coords}
                center={coords}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ styles: (darkMode ? mapStyles : '') }}
                onChange={e => {
                    setCoords({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
                }}
                onChildClick={(child) => setChildClicked(child)}
                onChildMouseEnter={(child) => setChildHover(child)}
                onChildMouseLeave={() => setChildHover()}
            >
                {recAreas && recAreas.length > 0 ? (recAreas.map((place, i) =>
                    <div key={i} lat={Number(place.RecAreaLatitude)} lng={Number(place.RecAreaLongitude)}>
                        {/* Conditional rendering of pin icon, star icon, heart icon on map */}
                        {placeInFavorites(place.RecAreaID) && placeInStarred(place.RecAreaID) ? <Icon icon="si-glyph:pin-location-1" className="text-4xl text-red-500 iconMarker" /> : placeInFavorites(place.RecAreaID) ? <Icon icon="carbon:location-heart-filled" className="text-4xl iconMarker text-red-600" /> : (placeInStarred(place.RecAreaID) ? <Icon icon="carbon:location-star-filled" className="text-4xl iconMarker text-yellow-500" /> : <Icon icon="carbon:location" className="text-4xl iconMarker" />)}
                    </div>)
                ) : (
                    null
                )}
                {/* SETTING THE HOME ICON */}
                {home ? (
                    <div lat={Number(home.lat)} lng={Number(home.lng)} className="cursor-pointer z-20">
                        <Icon icon="carbon:location-person-filled" className="text-4xl iconMarker text-gray-500" />
                    </div>
                ) : (
                    null
                )}

            </GoogleMapReact>
        </div>
    )
}

export default Map
