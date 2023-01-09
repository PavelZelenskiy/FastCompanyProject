import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import CheckBoxField from '../common/form/checkBoxField';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthErrors, login } from '../../store/users';
// import * as yup from 'yup';

const LoginForm = () => {
    const loginError = useSelector(getAuthErrors());

    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required('Пароль обязателен для заполнения')
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             'Пароль дожен содержать хотя бы одну заглавную букву'
    //         )
    //         .matches(/(?=.*[0-9])/, 'Пароль дожен содержать хотя бы одно число')
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             'Пароль должен содержать один из специальных символов !@#$%^&*'
    //         )
    //         .matches(
    //             /(?=.{8,})/,
    //             'Пароль должен состоять минимум из 8 символов'
    //         ),
    //     email: yup
    //         .string()
    //         .required('Электронная почта обязательна для заполнения')
    //         .email('Email введен некорректно')
    // });

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }));
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/';
        // console.log(data);
        dispatch(login({ payload: data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default LoginForm;
