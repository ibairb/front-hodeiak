import React, { useState, useEffect } from 'react';
import Modal from './Modal'
import './Profile.scss'

const Profile = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');
    const [projects, setProjects] = useState(' ');
    const [hourCost, setHourCost] = useState(' ');
    const [modalOpen, setModalOpen] = useState(false);

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
            setHourCost(res.hourCost)
            setProjects(res.projects)
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
                    <div className='DataConModal'>
                        <div className='Data'>
                            <div className='list'>
                                <p>email: </p>
                                <p>status: </p>
                                <p>username: </p>
                                <p>hour cost: </p>
                                <p>projects: </p>

                            </div>
                            <div className='listName'>
                                <p>{email}</p>
                                <p>{status}</p>
                                <p>{username}</p>
                                <p>{hourCost}</p>
                                <p>{projects}</p>
                            </div>

                        </div>

                        <div className='edit'>
                            <button className='material-symbols-outlined'
                                onClick={() => { setModalOpen(true) }}> edit
                            </button>
                            {modalOpen && <Modal setOpenModal={setModalOpen} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Profile;