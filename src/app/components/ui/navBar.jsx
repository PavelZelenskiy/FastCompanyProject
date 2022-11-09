import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
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
            <li className="nav-item">
                <Link className="nav-link" to="/login">
                    Логин
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">
                    Пользователи
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
