import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => {

    const [email, setEmail] = useState(' ');
    const [status, setStatus] = useState(' ');
    const [username, setUsername] = useState(' ');

    function Logout() {
        window.location.href = 'http://localhost:3000/'
    }

    const getData = () => {
        return localStorage.getItem('email')
    }

    function GoPerfil(e) {
        e.preventDefault();
        window.location.href = 'http://localhost:3000/profile'
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
        status != 'admin' ?
            <>
                <ul className='navbar'>
                    <li className='nav-item'>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/tasks">Tasks</Link>
                    </li>
                    <li className='login-data1'>
                        <span class="material-symbols-outlined">
                            badge
                        </span>
                        <p id='username'>{username}</p>
                    </li>
                    <li>
                        <button className='boton-logout' onClick={Logout}>Logout</button>
                    </li>
                </ul>
            </> : <>
                <ul className='navbar'>
                    <li className='nav-item'>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/tasks">Tasks</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/users'>Users</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/clients'>Clients</Link>
                    </li>
                    <div className='botonPerfil'>
                    <li className='login-data'>
                        <span class="material-symbols-outlined" onClick={GoPerfil}>
                            badge
                        </span>
                        <p id='username'>{username}</p>
                    </li>
                    </div>
                    <li>
                        <button className='boton-logout' onClick={Logout}>Logout</button>
                    </li>
            
                </ul>
            </>
    )

}

export default Navbar;