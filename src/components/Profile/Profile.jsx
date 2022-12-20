import React, { useState, useEffect } from 'react';
import './Profile.scss'

const Profile = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [projects, setProjects] = useState(' ');

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
            setProjects(res.projects)
        })

    return (
        <>
            <div className="content">
                <h2>Profile</h2>
                <br/>
                <div className='datos'>
                    <div>
                        <img src='https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png' />
                    </div>
                    <div>
                        <p>email: {email}</p>
                        <p>status: {status}</p>
                        <p>username: {username}</p>
                        <p>projects: {projects}</p>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Profile;