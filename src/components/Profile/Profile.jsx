import React, { useState, useEffect } from 'react';

const Profile = () => {

    const [email, setEmail] = useState(' ');

    const getData = () => {

        return localStorage.getItem('email')
    }

    useEffect(() => {
        setEmail(getData());
    }, [])
    

    return (
        <>
            <div className="content">
                <h2>Profile</h2>
                <h3>{email}</h3>
            </div>
        </>
    )
}

export default Profile;