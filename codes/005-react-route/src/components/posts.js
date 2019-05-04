import React from 'react';
import { Link } from 'react-router-dom';

const Posts = () => {
	return (
		<div>
			<h3>Posts</h3>
			<ul>
				<li><Link to='/posts/1'>Post 1</Link></li>
				<li><Link to='/posts/2'>Post 2</Link></li>
				<li><Link to='/posts/3'>Post 3</Link></li>
				<li><Link to='/posts/4'>Post 4</Link></li>
			</ul>
		</div>
	)
}

export default Posts;