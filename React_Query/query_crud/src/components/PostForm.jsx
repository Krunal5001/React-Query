import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostForm = ({ onSubmit, initialValue }) => {

    const [post, setPost] = useState({
        title: initialValue.title || '',
        body: initialValue.body || ''
    })

    const handleChangeInput = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const renderField = (label) => (
        <div>
            <label>{label}</label>
            <br />
            <input onChange={handleChangeInput} type="text" name={label.toLowerCase()} value={post[label.toLowerCase()]} style={{ marginBottom: '20px', width: '25%' }} />
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(post);
        toast.success('Post Create is successful!');
        setPost({
            title: "",
            body: ""
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {renderField('Title')}
            {renderField('Body')}
            <button type="submit" style={{ background: 'skyBlue', color: 'black', padding: '6px 20px' }}>Submit</button>
            <ToastContainer />
        </form>
    )
}

export default PostForm;