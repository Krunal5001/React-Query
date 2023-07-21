import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPost } from '../api/Posts';
import { useQuery } from '@tanstack/react-query';

const Post = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        isLoading,
        isError,
        data: post,
        error,
    } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id),
    });

    if (isLoading) return "loading...";
    if (isError) return `Error: ${error.message}`;

    return (
        <>
            <div>Post by id Data</div>
            <button onClick={() => navigate('/')}>Back to the List page</button>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </>
    )
}

export default Post;