import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import MyComponent, { Function } from './main';

class AppComponent extends Component {
	render(){
		return (
			<Fragment>
				<Function name={'Burak'} />
				<MyComponent />
			</Fragment>
		)
	}
}

ReactDOM.render(<AppComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
