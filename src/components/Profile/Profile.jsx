import React, { useState, useEffect } from 'react';
import './Profile.scss'

const Profile = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [projects, setProjects] = useState(' ');
    const [phone, setPhone] = useState(' ');
    const [hourCost, setHourCost] = useState(' ');

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
            setPhone(res.phone)
            setHourCost(res.hourCost)
        })

    return (
        <>
            <div className="content">
                <h2>Profile</h2>
                <br />
                <div className='datos'>
                    <div>
                        <img src='https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png' />
                    </div>
                    <div className='Data'>
                        <div className='list'>
                            <p>email: </p>
                            <p>status: </p>
                            <p>username: </p>
                            <p>phone: </p>
                            <p>hour cost: </p>
                        </div>
                        <div className='listName'>
                            <p>{email}</p>
                            <p>{status}</p>
                            <p>{username}</p>
                            <p>{phone}</p>
                            <p>{hourCost}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Profile;