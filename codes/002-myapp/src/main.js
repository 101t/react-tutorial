import React from 'react';
import * as data from './mydata.json';

function Function  ({ name }) {
	let greeting = `Hello Mr. ${name}`;// $greeting = "Hello Mr. $name"; in PHP
	return (
		<h1>{greeting}</h1>
	)
}


class MyComponent extends React.Component {
		
	constructor(){
		super();
		this.state = {
			car: "red",
			home: "flat",
			myAge: 12
		}
	}
	componentDidMount(){
		this.setState(currentState => ({myAge: this.state.myAge + 18}));
		this.setState({car: "black", home: "villa"});
		// this.state.car = "black" // Wrong!!
	}
	render() {
		console.log(JSON.stringify(data));
		return (
			<div>
				My car is {this.state.car}<br />
				My home is {this.state.home}<br />
				My Age is {this.state.myAge}
			</div>
		)
	}
}

export default MyComponent;
export { Function };