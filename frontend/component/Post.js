import React from 'react'
import { Link } from 'react-router-dom'
const Post = ({post}) => {
  return (
    <>
        <div className="card mb-4">
			<div className="row">
				<div className="col-sm-12 col-md-3">
					<img className="img-fluid h-100 card-img-top" src={post.image} alt=""/>
				</div>
				<div className="card-body col-md-8">
					<h5 className="card-title">{post.title}</h5>
					<p className="card-text">{post.content.slice(0,50)}</p>
					<Link to={`/posts/${post._id}`}className="btn btn-primary" >Read More</Link>
				</div>
			</div>

		</div>
    </>
  )
}

export default Post