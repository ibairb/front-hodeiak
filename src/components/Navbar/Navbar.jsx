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
                        <Link to="/projects">Proyectos</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/profile">Perfil</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/tasks">Tareas</Link>
                    </li>
                    <li className='login-data'>
                        <img src='https://static.wixstatic.com/media/e42ea9_2a5993ef17c94b2b847d264cb801beea~mv2.png/v1/crop/x_0,y_26,w_673,h_621/fill/w_380,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Profile-PNG-File.png' />
                        <p id='username'>{username}</p>
                    </li>
                    <li>
                        <button className='boton' onClick={Logout}>Logout</button>
                    </li>
                </ul>
            </> : <>
                <ul className='navbar'>
                    <li className='nav-item'>
                        <Link to="/projects">Proyectos</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/profile">Perfil</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/tasks">Tareas</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/users'>Users</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/clients'>Clients</Link>
                    </li>
                    <li className='login-data'>
                        <img src='https://static.wixstatic.com/media/e42ea9_2a5993ef17c94b2b847d264cb801beea~mv2.png/v1/crop/x_0,y_26,w_673,h_621/fill/w_380,h_352,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Profile-PNG-File.png' />
                        <p id='username'>{username}</p>
                    </li>
                    <li>
                        <button className='boton' onClick={Logout}>Logout</button>
                    </li>
                </ul>
            </>
    )

}

export default Navbar;