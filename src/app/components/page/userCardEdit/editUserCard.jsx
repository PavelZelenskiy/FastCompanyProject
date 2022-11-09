import React, { useState, useEffect } from 'react';
import MultiSelectField from '../../common/form/multiSelectField';
import RadioField from '../../common/form/radioField';
import SelectField from '../../common/form/selectField';
import TextField from '../../common/form/textField';
import API from '../../../api';
import { validator } from '../../../utils/validator';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditUserCard = ({ userId }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'Мужчина',
        qualities: [],
        licence: false
    });
    const [loader, setLoader] = useState(false);
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const transform = (data) => {
        return data.map((el) => ({ label: el.name, value: el._id }));
    };

    useEffect(() => {
        API.users.getById(userId).then(({ qualities, profession, ...data }) => {
            setData({
                ...data,
                profession: profession._id,
                qualities: transform(qualities)
            });
            setLoader(true);
        });
        API.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        API.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
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
                message: 'Обязательно выберерите свою профессию'
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
        const { profession, qualities } = data;
        API.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => history.goBack());
    };

    return (
        loader && (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {loader && (
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
                                    options={professions}
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
                                    options={qualities}
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
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

EditUserCard.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditUserCard;
