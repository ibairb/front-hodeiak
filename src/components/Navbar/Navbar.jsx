import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './Navbar.scss'
import Users from '../Users/Users';
import Clients from '../Clients/Clients';
import Profile from '../Profile/Profile';
import Projects from '../Projects/Projects';
import Imputation from '../Imputation/Imputation';

const Navbar = () => {

    return (
        <>
           <BrowserRouter>

            <ul className='navbar'>
                    <li className='nav-item'>
                        <Link to="/users">Users</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/clients">Clients</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/projects">Projects</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to="/imputation">Imputation</Link>
                    </li>
                </ul>

                <Routes>
                    <Route>
                        <Route path='/users' element={<Users />} />
                        <Route path='/clients' element={<Clients />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/imputation' element={<Imputation />} />
                    </Route>
                </Routes>

            </BrowserRouter>

        </>
    )
}

export default Navbar;