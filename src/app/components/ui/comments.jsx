import { orderBy } from 'lodash';
import React, { useEffect } from 'react';
import CommentsList, { AddCommentForm } from '../common/comments';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from '../../store/comments';
import { useParams } from 'react-router-dom';
import { getCurrentUserData } from '../../store/users';

const Comments = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const { userId } = useParams();
    const currentUser = useSelector(getCurrentUserData());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleSubmit = (data) => {
        dispatch(createComment(data, userId, currentUser._id));
    };
    const handleRemoveComment = (id) => {
        // console.log(id);
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ['created_at'], ['desc']);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Комментарии</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            'Загрузка комментариев...'
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
