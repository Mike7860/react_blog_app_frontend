import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Category = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        const category = props.match.params.id;
        setCurrentCategory(capitalizeFirstLetter(category));

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/category`, { category }, config);
                setBlogs(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    }, [props.match.params.id]);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getCategoryBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.day} {blogPost.month}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}</p>
                        <Link onClick={() => {window.location.href=`/blog/${blogPost.slug}`}} className="stretched-link text-primary">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (

        <div className='container mt-3'>
            <h3 className='display-4 justify-content-center rounded py-1 mb-1'><center>{currentCategory} Category</center></h3>
            <div className="nav-scroller bg-dark justify-content-center rounded py-1 mb-3">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/world'}}>World</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/technology'}}>Technology</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/business'}}>Business</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/opinion'}}>Opinion</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/science'}}>Science</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/health'}}>Health</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/style'}}>Style</Link>
                    <Link className="p-2 text-white" onClick={() => {window.location.href='/blog/category/travel'}}>Travel</Link>
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    );
};

export default Category;