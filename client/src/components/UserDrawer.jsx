import React from 'react'

const UserDrawer = props => {
    const { userDrawer, setUserDrawer } = props
    return (
        <>
            <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li>
                    <a>Menu Item</a>
                </li>
                <li>
                    <a>Menu Item</a>
                </li>
            </ul>
        </>
    )
}

export default UserDrawer
