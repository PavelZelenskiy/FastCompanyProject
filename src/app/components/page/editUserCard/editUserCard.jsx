import React, { useState, useEffect } from 'react';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';
import { validator } from '../../../utils/validator';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BackHistoryButton from '../../common/backButton';
import { useQualities } from '../../../hooks/useQualities';
import { useProfessions } from '../../../hooks/useProfession';
import { useAuth } from '../../../hooks/useAuth';

const EditUserCard = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'Мужчина',
        qualities: [],
        licence: false
    });
    // const [loader, setLoader] = useState(false);
    const { currentUser, updateUser, isLoading } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();
    const [errors, setErrors] = useState({});
    const history = useHistory();
    // console.log(currentUser);
    // console.log(data);

    useEffect(() => {
        setData({
            ...currentUser,
            profession: currentUser.profession,
            qualities: currentUser.qualities
        });
    }, []);

    // const userQualitiesList = [];
    // for (const qual of qualities) {
    //     for (const q of currentUser.qualities) {
    //         if (qual._id === q) {
    //             userQualitiesList.push(qual);
    //         }
    //     }
    // }

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите свою профессию'
            }
        },
        name: {
            isRequired: { message: 'Имя и Фамилия обязательны для заполнения' }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        updateUser(newData);
        // console.log(newData);
        history.goBack();
    };

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя Фамилия"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                defaultOption="Выберите профессию"
                                name="profession"
                                error={errors.profession}
                                value={data.profession}
                                label={'Выберите Вашу профессию'}
                                options={professionsList}
                            />
                            <RadioField
                                options={[
                                    { name: 'Мужчина', value: 'Мужчина' },
                                    { name: 'Женщина', value: 'Женщина' },
                                    { name: 'Другое', value: 'Другое' }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите Ваш пол"
                            />
                            <MultiSelectField
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите Ваши качества"
                                defaultValue={data.qualities}
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Отправить
                            </button>
                        </form>
                    ) : (
                        'Загрузка...'
                    )}
                </div>
            </div>
        </div>
    );
};

EditUserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserCard;
