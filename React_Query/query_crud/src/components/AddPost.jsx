import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createPost } from '../api/Posts';
import PostForm from './PostForm';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {

    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    })

    const handleCreatePost = (post) => {
        createPostMutation.mutate({
            id: uuidv4(),
            ...post
        })
    }

    return (
        <div>
            <h3>Add Post</h3>
            <PostForm onSubmit={handleCreatePost} initialValue={{}} />
        </div>
    )
}

export default AddPost;