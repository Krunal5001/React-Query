import React from 'react';
import { deletePost, fetchPosts } from '../api/Posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AddPost from '../components/AddPost';
import { useNavigate } from 'react-router-dom';

const PostList = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isLoading, isError, data: posts, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    })


    const deletePostMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            toast.warn('Post Delete is successful!')
        }
    })

    const handleDelete = (id) => {
        deletePostMutation.mutate(id);
    }

    if (isLoading) return "loading...";

    if (isError) return `Error: ${error?.message}`;

    return (
        <div>
            <AddPost />
            <div style={{ marginTop: '20px' }}>Post List</div>
            {posts.map((post) => (
                <div key={post.id} style={{ background: "#777", padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4
                        style={{ cursor: "pointer", width: '60%', margin: '0' }}
                        onClick={() => navigate(`/post/${post.id}`)}
                    >
                        {post.title}
                    </h4>
                    <div>
                        <button onClick={() => navigate(`/post/${post.id}/edit`)} style={{ background: 'lightBlue', color: 'black', padding: '6px 20px', marginRight: '20px' }}>Edit</button>
                        <button onClick={() => handleDelete(post.id)} style={{ background: 'red', color: 'black', padding: '6px 20px' }}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostList;