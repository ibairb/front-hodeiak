import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => {

    const [email, setEmail] = useState(' ')
    const [status, setStatus] = useState(' ');

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
                            <li className='nav-item'>
                                <button className='boton' onClick={Logout}>Logout</button>
                            </li>
                        </ul>
                    </>
        )

}

export default Navbar;