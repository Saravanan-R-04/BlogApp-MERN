import React, { useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
const Detail = () => {

    const[PostDetail,setPostDetail]=useState(null);
    const {id}=useParams();
    const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/posts/${id}`);
      setPostDetail(response.data.post);
    } catch (error) {
      console.error("Error fetching post detail:", error);
    }
  };
    useEffect(() => {
  fetchPosts();
}, [id]); // ✅ clean, no warnings

    if(!PostDetail)
    {
        return <p>Loading...</p>
    }

    const formattedDate= Intl.DateTimeFormat('en-US',{
        month:'long',
        day:'numeric',
        year:'numeric'
    }).format(new Date(PostDetail.createdAt))
  return (
    <>
    <header>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="#">My Blog</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link className="nav-link active" aria-current="page" to="#">Home</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">Posts</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">About</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="#">Contact</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>



    <main className="container my-4">
        <div className="row">
           <article className="col-lg-8">
                <h2 className="blog-post-title">{PostDetail.title}</h2>
                <p className="blog-post-meta">
                    {formattedDate}<strong> {PostDetail.author}</strong>
                </p>
                <img className="mb-3 img-fluid" src={PostDetail.image} alt={PostDetail.title} />
                    <div className="blog-post-content">
                        <p>{PostDetail.content}</p>
                    </div>
            </article>


            <aside className="col-lg-4">
                <div className="p-4 bg-light">
                    <h3 className="mb-4">Related Posts</h3>

                    {/* <!-- Example of a related post with image --> */}
                    <div className="mb-4">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <img src="https://placehold.co/200x150?text=MongoDB"className="img-fluid rounded" alt=""/>
                            </div>
                            <div className="col">
                                <h4><Link href="#" className="text-decoration-none">MongoDB for Beginners</Link></h4>
                                <p>MongoDB is a NoSQL database used in many MERN apps.</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Add more related posts with images as needed --> */}
                    <div className="mb-4">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <img src="https://placehold.co/200x150?text=React" className="img-fluid rounded" alt=""/>
                            </div>
                            <div className="col">
                                <h4><Link href="#" className="text-decoration-none">Introduction to React</Link></h4>
                                <p>React is a JavaScript library for building user interfaces.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </main>

    <footer className="bg-dark text-light py-3 fixed-bottom">
        <div className="container text-center">
            &copy; 2024 Your Blog | All rights reserved
        </div>
    </footer>
    </>
  )
}

export default Detail