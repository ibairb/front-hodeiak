import React, { useState, useEffect } from 'react';

const Profile = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');

    const getData = () => {

        return localStorage.getItem('email')
    }

    useEffect(() => {
        setEmail(getData());
    }, [])

    fetch(`http://localhost:8000/users/${email}`)
        .then((res) => res.json())
        .then((res) => {
            setStatus(res.status)
            setUsername(res.username)

        })

    return (
        <>
            <div className="content">
                <h2>Profile</h2>
                <h3>Email: {email}</h3>
                <h2>Status: {status}</h2>
                <h2>Username: {username}</h2>
            </div>
        </>
    )
}




export default Profile;