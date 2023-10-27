import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Blog = () => {
    const backgroundPhoto = new URL("http://localhost:8000/content/photos/me_background.jpg",import.meta.url)
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/featured`);
                setFeaturedBlog(res.data[0]);
                console.log(res.data)
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/blog`);
                setBlogs(res.data);
            }
            catch (err) {

            }
        }

        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            if (blogPost.published)
            return list.push(
                <div className="row m-1 g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-lg h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h4 className="mb-0">{blogPost.title}</h4>
                        <div className="mb-2 text-muted">{blogPost.day} {blogPost.month}</div>
                        <p className="card-text text-justify mb-auto ">{blogPost.excerpt}</p>
                        <Link className="stretched-link text-primary" onClick={() => {window.location.href=`/blog/${blogPost.slug}`}} >Continue reading</Link>
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
            <div className='container'>
                <div className="jumbotron mt-5 text-white rounded">
                <h1 className="display-4 fw-bold"><center>Welcome to my blog!</center></h1>
                <div className="container mt-3 center">
                    <img width='1000' height='1250' src={backgroundPhoto} alt="imagee" />
                </div>
                <hr className="my-4" />
                <p className="lead"><center>We make all kinds of awesome blog about various topics.</center></p>

            </div>
        </div>
            <div className="nav-scroller bg-dark justify-content-center rounded py-1 mb-1">
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

            <div className="jumbotron p-4 p-md-5 text-black rounded">
                <div className="col-md-6 px-0">
                    <h1 className="mb-3 text-white font-weight-bold">{featuredBlog.title}</h1>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={featuredBlog.thumbnail} alt='thumbnail' />
                    </div>
                    <p className="card-text text-justify mb-3 text-white font-weight-bold">{featuredBlog.excerpt}</p>
                    <p className="lead mb-0">
                        <Link className="text-black font-weight-bold text-primary" onClick={() => {window.location.href=`/blog/${featuredBlog.slug}`}}>
                            Continue reading...
                        </Link>
                    </p>
                </div>
            </div>
            {getBlogs()}
        </div>
    );
};

export default Blog;