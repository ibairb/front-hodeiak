import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.scss'
import Users from '../Users/Users';
import Clients from '../Clients/Clients';
import Profile from '../Profile/Profile';
import Projects from '../Projects/Projects';
import Tasks from '../Tasks/Tasks';

const Navbar = () => {

    return (
        <>
           <BrowserRouter>

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
                        <button className='boton'>Logout</button>
                    </li>
                </ul>

                <Routes>
                    <Route>
                        <Route path='/users' element={<Users />} />
                        <Route path='/clients' element={<Clients />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/tasks' element={<Tasks />} />
                    </Route>
                </Routes>

            </BrowserRouter>

        </>
    )
}

export default Navbar;