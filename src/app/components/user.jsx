import React from "react";
import Qualiti from "./qualitie";
import BookMark from "./bookmark";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
    bookmark,
    onToggleBookMark,
}) => {
    return (
    
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((q) => (
                    <Qualiti key = {q._id} {...q} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td><BookMark status = {bookmark} onClick = {() => onToggleBookMark(_id)}/></td>
            <td>
                <button onClick={() => onDelete(_id)} className="btn btn-danger"> delete </button>
            </td>
        </tr>
    );
};

export default User;