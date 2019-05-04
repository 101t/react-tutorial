import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, MemoryRouter, HashRouter, Route, Link } from 'react-router-dom';

import About from './components/about';
import Home from './components/home';
import PostItem from './components/postItem';
import Posts from './components/posts';
import Profile from './components/profile';


const App = () => { // Component Function
	return (
		<React.Fragment>
			<BrowserRouter>
				<ul>
					<li><Link to="/" >Home</Link></li>
					<li><Link to="/about" >About</Link></li>
					<li><Link to="/posts" >Posts</Link></li>
					<li><Link to="/profile" >Profile</Link></li>
				</ul>
				<Route path='/' exact component={Home} />
				<Route path='/about' component={About} />
				<Route path='/posts' exact component={Posts} />
				<Route path='/posts/:id' component={PostItem} />
				<Route path='/profile' component={Profile} />
			</BrowserRouter>
		</React.Fragment>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);