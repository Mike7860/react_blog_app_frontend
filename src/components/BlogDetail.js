import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const slug = props.match.params.id;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/${slug}`);
                setBlog(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [props.match.params.id]);

    const createBlog = () => {
        return {__html: blog.body}
    };

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <div className='container text-justify mt-3'>
            <h1 className='display-4'><center>{blog.title}</center></h1>
            <h4 className='text-muted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h4>
            <h5>{blog.day} {blog.month}</h5>
            <div className='mt-4 mb-4' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link className='font-weight-bold text-primary' onClick={() => {window.location.href="/blog/"}} >Back to Blog</Link></p>
        </div>
    );
};

export default BlogDetail;