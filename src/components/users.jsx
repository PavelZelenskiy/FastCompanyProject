import React, { useState } from "react";
import api from "../api";

const Users = () => {

    const [users, setUsers] = useState(api.users.fetchAll());
    
    
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId));
    };

    const renderPhrase = () => {
        if (users.length !== 0 ) {
            if (users.length > 1 && users.length < 5) {
                return <h3><span className="badge bg-primary ">{users.length + ' человека' + ' тусанет с тобой сегодня'}</span></h3>
            } else {
                return <h3><span className="badge bg-primary ">{users.length + ' человек' + ' тусанет с тобой сегодня'}</span></h3> 
            };
        } else {
            return <h3><span className="badge bg-danger ">Никто с тобой не тусанет</span></h3>
        };
    };

    const renderTable = () => {
        return users.length !== 0 ? (
            <table className="table">
                <thead>
                    <tr>
                    <th>Имя</th>
                    <th>Качества</th>
                    <th>Профессия</th>
                    <th>Встретился, раз</th>
                    <th>Оценка</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.qualities.map(x => (<span className = {"badge m-1 bg-" + x.color}>{x.name}</span>))}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate} /5</td>
                                <td><div><button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button></div></td>
                            </tr>
                    ))}
                </tbody>
            </table>
        ) : '';
    };

    return (
        <>
        {renderPhrase()}
        {renderTable()}
        </>
    );
};

export default Users;