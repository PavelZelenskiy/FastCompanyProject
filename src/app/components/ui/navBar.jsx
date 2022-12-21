import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './navProfile';

const NavBar = () => {
    const { currentUser } = useAuth();

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link
                            className="nav-link active"
                            aria-current="page"
                            to="/main"
                        >
                            Главная
                        </Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">
                                Пользователи
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link" to="/login">
                            Войти
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
