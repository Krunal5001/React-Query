import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPost, updatePost } from '../api/Posts';
import PostForm from '../components/PostForm';

const EditPost = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const {
        isLoading,
        isError,
        data: post,
        error,
    } = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPost(id),
    });

    const updatePostMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate('/');
            toast.success('Post Update is successful!');
        }
    })

    const handleSubmit = (updatedPost) => {
        updatePostMutation.mutate({ id, ...updatedPost });
    }

    if (isLoading) return "loading...";
    if (isError) return `Error: ${error.message}`;


    return (
        <div>
            <PostForm onSubmit={handleSubmit} initialValue={post} />
        </div>
    )
}

export default EditPost;