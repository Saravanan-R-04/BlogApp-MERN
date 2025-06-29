import React, { useEffect, useState } from 'react'
import Post from '../components/Post'
import axios from 'axios'
import { Link } from 'react-router-dom'
const PostList = () => {
  const [posts,setPosts]=useState([])
  const [categories,setCategories]=useState([])
  const fetchPosts=async()=>{
    const response = await axios.get("http://localhost:5500/api/posts/");
    console.log(response.data);
    setPosts(response.data.post); 
  }
  const fetchCategories=async()=>{
    const response = await axios.get("http://localhost:5500/api/categories/");
    console.log(response.data);
    setCategories(response.data.category); 
  }
  useEffect(()=>{
    fetchPosts();
	fetchCategories();
  },[])
  return (
    <>
    <header>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<a className="navbar-brand" href="#">My Blog</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Posts</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">About</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Contact</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>

	<main>
		<div className="container mt-4">
			<div className="row">
				
				<div className="col-lg-8">
					<h1 className="mb-4">Latest Posts</h1>
               { posts.length>0 ? posts.map((post)=>
                    <Post post={post}/>) : <center><h3>Posts Not Available</h3></center>
               }
				</div>
				
				<div className="col-lg-4">
					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title">About Me</h5>
							<p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
					</div>

					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title">Categories</h5>
							<ul className="list-group">
								{categories.map(category =>
									<li className="list-group-item"><Link to={`/posts/category/${category._id}`}className="text-black">{category.name}</Link></li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
    </div>
	</main>
	<br/>
	<br/>
	<br/>
	<footer className="bg-dark text-white text-center py-3 fixed-bottom">
		<div className="container">
			<p>&copy; 2024 My Blog. All rights reserved.</p>
		</div>
	</footer>
    </>
  )
}

export default PostList