import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.scss'

const Navbar = () => {

    function Logout() {
        window.location.href = 'http://localhost:3000/'
    }


    return (
        <>

            <ul className='navbar'>
                <li className='nav-item'>
                    <Link to="/users">Usuarios</Link>
                </li>
                <li className='nav-item'>
                    <Link to="/clients">Clientes</Link>
                </li>
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

        </>
    )
}

export default Navbar;