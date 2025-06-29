import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/posts/category/${id}`);
      console.log("Posts:", response.data);
      setPosts(response.data.posts || response.data.post || []); // safe fallback
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/api/categories/${id}`);
      console.log("Category:", response.data);
      setCategory(response.data.category || response.data); // adjust depending on backend
    } catch (error) {
      console.error("Error fetching category:", error.message);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchCategory();
      await fetchPosts();
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading || !category) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

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
                <li className="nav-item"><Link className="nav-link active" to="#">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">Posts</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="#">Contact</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-8">
             <h3 className="mb-4">{category?.name || 'Loading category...'}</h3>


              {posts.length === 0 && (
                <p>No posts available for this category.</p>
              )}

              {posts.map((post) => (
                <div className="card mb-4" key={post._id}>
                  <div className="row">
                    <div className="col-sm-12 col-md-3">
                      <img
                        className="img-fluid h-100 card-img-top"
                        src={post.image || "https://via.placeholder.com/800x400"}
                        alt={post.title}
                      />
                    </div>
                    <div className="card-body col-md-8">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text">
                        {post.content.length > 100
                          ? post.content.slice(0, 100) + "..."
                          : post.content}
                      </p>
                      <Link to={`/posts/${post._id}`} className="btn btn-primary">Read More</Link>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 fixed-bottom">
        <div className="container">
          <p>&copy; 2024 My Blog. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default PostList;
