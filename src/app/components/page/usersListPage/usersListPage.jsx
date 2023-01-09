import React, { useState, useEffect } from 'react';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../common/pagination';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UserTable from '../../ui/usersTable';
import _ from 'lodash';
import PropTypes from 'prop-types';
import InputSearch from '../../inputSearch';
import {
    getProfessions,
    getProfessionsLoadingStatus
} from '../../../store/professions';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUsersList } from '../../../store/users';

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const currentUserId = useSelector(getCurrentUserId());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
    const pageSize = 6;
    const [inputValue, setInputValue] = useState('');
    const users = useSelector(getUsersList());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    // console.log(users);

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        // console.log(userId);
    };

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setInputValue('');
    };

    const inputValueChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            if (data) {
                let filteredUsers;
                if (inputValue !== '') {
                    filteredUsers = data.filter((user) =>
                        user.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    );
                } else if (selectedProf) {
                    filteredUsers = data.filter(
                        (user) =>
                            JSON.stringify(user.profession) ===
                            JSON.stringify(selectedProf)
                    );
                } else {
                    filteredUsers = data;
                }
                return filteredUsers.filter((u) => u._id !== currentUserId);
            }
        }

        const filteredUsers = filterUsers(users);

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {' '}
                            Очиститть
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <InputSearch
                        value={inputValue}
                        onChange={inputValueChange}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return 'loading...';
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
