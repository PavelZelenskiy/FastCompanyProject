import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import userService from '../../services/user.service';
import { setTokens } from '../../services/localStorage.service';
import { toast } from 'react-toastify';

const httpLogin = axios.create();
const LoginContext = React.createContext();

export const useLogin = () => {
    return useContext(LoginContext);
};

const LoginProvider = ({ children }) => {
    const [error, setError] = useState(null);

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;

        try {
            const { data } = await httpLogin.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Пользователь с таким email не существует'
                    };
                    throw errorObject;
                } else if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Неверный пароль'
                    };
                    throw errorObject;
                }
            }
        }
    }

    // async function getUser(data) {
    //     try {
    //         const { content } = await userService.get();
    //         for (const user of content) {
    //             if (user._id === data.localId) {
    //                 return user;
    //             }
    //         }
    //     } catch (error) {}
    // }

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    });

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <LoginContext.Provider value={{ signIn }}>
            {children}
        </LoginContext.Provider>
    );
};

LoginProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default LoginProvider;
