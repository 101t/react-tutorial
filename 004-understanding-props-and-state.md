## Understanding state and props

* The different between **state** and **props** is that **state** is owned by the component itself while **props** is something that is passed down to the component by it's parent.
* The similarity (sort of) is that React automatically re-renders your component when either the component's **state** changes or when the component's **props** changes.
* Your component's **render** function is a function of both **state** and **props** meaning it defines what your component should look like given the **state** and **props**, it should be pure function in a sense that if the component has same **state** and **props** it should render exactly same content no matter how many times it's called and shouldn't have any side effects.

### Understanding state

State simply is the place where the data comes from, component state should be always simple and has minimized number of stateful components.

#### Example:
```javascript
import React from 'react';


class StateApp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			head: "This is the header",
			body: "Content of body",
			count: 34
		}
	}
	render() {
		return (
			<div>
				<h1>{this.state.head}</h1>
				<p>{this.state.body}</p>
				<p>Number of people: {this.state.count}</p>
			</div>
		);
	}
}

export default StateApp; 
```
#### setState function

**state** is just an object, if you notice the constructor, we initialize the state with **head**, **body**, and **count**, and we used it in render function as `{this.state.head}`, `{this.state.body}`, and `{this.state.count}`.

We initialized the **state** in constructor but how to update it? React provides a function called **setState**, you should always use **setState** function to update state and **never mutate it directly**.
```
// never do this
this.state.count = 23;

// it is correct
this.setState({
	count: 23
});
```
if **state** is just an instance variable in the component, why we should use **this.setState({count: 23})** not **this.state.count = 23**? the main reason React understands **state**, when component **state** changed React re-renders your component (by rendering means it calls the **render** function again to see if the DOM will change as a result of change in **state**), this fundamental to declarative React nature.

```javascript
setState(newState || function, optional callback)
```
The way **setState** updates the state is:
1. The first argument of the **setState** function is an object, it merges the current **state** object with whatever you passed to the **setState** function:
```javascript
state = { a: 1, b: 2, c: 3 } // current state
this.setState({a: 4}); // we called setState with just one key value pair

// it will merge the initial state with the object passed to setState as a result only the value of the one key has updated.
state = { a: 4, b: 2, c: 3 }
```
2. The first argument is a function then it first executes the function by passing the current **state** as it's argument, the function must return an object, it then merges this output with the current **state** just like it did above.
```javascript
state = { a: 1, b: 2, c: 3 } // current state
// we called setState with a function
this.setState(currentState => ({
	a: currentState.a + 3
}));
// it executes the function by passing the current state object as argument, since currentState.a is 1, function returns { a: 4 }.
// Noe merges this returned object with the original state
state = { a: 4, b: 2, c: 3 } // the state after setState is called
```

#### setState important explanation

One thing you must know about **setState** function is that it may be asynchronous, so **do not** rely on it to updatethe state immediately, this is not a bug, it's by design, if you want to read up on the design decisin behind **setState** call being asynchronous, here's a [nice explanation](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

Since **setState** can be asynchronous below code will not give you the right result because by the time we **console.log()** the **state.count** value, it won't be updated.
```javascript
// Wrong result, do not rely on setState to be synchronous
console.log(this.state.count); // prints 0
this.setState({
	counter: this.state.count + 1
});
// this is asynchronous call
console.log(this.state.count) // still prints 0
```
Also if you want to update state using the current state value **always use** the updater function inside **setState** instead of passing object:
```javascript
// Don't use this, if you are using the current state value to update the state, never use this.state directly inside setState
console.log(this.state.count);
this.setState({count: this.state.count + 1});
this.setState({count: this.state.count + 1});
this.setState({count: this.state.count + 1});
/ The state will be 1 when all of the calls are flushed because since the calss were asynchronous, this.state.count on all three calls were 0 and adding 1 resulted in 1.

// Always do this, if you are using current state value to update the state, always use updater function.
console.log(this.state.count);
this.setState((state) => ({ count: state.count + 1 }));
this.setState((state) => ({ count: state.count + 1 }));
this.setState((state) => ({ count: state.count + 1 }));
// this is guaranted to work, when all three calls are flushed the value of this.state.count will be 3.
```
Now we discussed several things about **state** and it must be overwhelming, let's just recap the rules:

1. Never mutate **this.state** directly, Always use **this.setState** to update the **state**.
2. If your new **state** doesn't depend on the old **state** then you can use **this.setState(object)** construct.
3. IF your new **state** depends on the old **state** then use **this.setState(function(currentState){..})** construct.

### Understanding props
**props** are something that the component is passed by the user of that component or parent component passes **props** to child component, you can pass anthing as a props: **functions**, **object**, **boolean**, **string**, and **number**. here an example of a function component passing the **props** to its child function component.
```javascript
function ChildFunction(props){
	return (
		<div>{props.someText}</div>
	)
}

function ParentFunction(props){
	return (
		<ChildFunction someText={"Hello Props"}></ChildFunction>
	)
}
```
The above example shows **ParentFunction** component uses **ChildFunction** component inside it's return, it's also passing something called **someText** with value **"Hello Props"**, we calling this passing the props, there are two type way to pass **props** in component:
1. Component created with function:
	if you created your component as a **function** like we did here, all the **props** its **ParentFunction** passed down will be accessible through the argument, if you look at the **ChildFunction** above it's using **props.someText** inside the **div**, all the **props** passed to the **ChildFunction** are passed as this single **props** argument.
2. Component create as React.Component:
	if you create your component as class extending React.Component then all the **props** would be available as **this.props**, the equivalent of above **ChildClass** would look like this:
```javascript
class ChildClass extends React.Component {
	render() {
		return (
			<div>{this.props.someText}</div>
		)
	}
}
```

**Warning:** One thing you must remember regarding **props** is that you should **never mutate props**, React will complain if you do, like something given to the component by it's parent - accept with love and don't try to mess around with things to make your parent angry!

```
function ChildFunction(props){
	// Never do this
	props.someText = "I want to mutate props";
	return (
		<div>{props.someText}</div>
	)
}
```
### PropTypes

In many cases it's better for a component to clearly define a contract regarding the **props** it can accept - data typ, data structure, if the props is required etc. There are couple obvious benefits of this:

* React can enforce type checking to avoid many bugs arising from parents passing props with a type that's different from what the children expects for example parent passing **string** when children expects an **object**.
* If you are writing components that will be used by different people at different parts of the application, it's always useful for those users to know what are the props they can pass, what is the expected structure of the props.

To define this contract, first you need to install **prop-types** as dependency:
```sh
npm install --save prop-types
```
Usage example:
```javascript
import React from 'react';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
	render() {
		return (...)
	}
}

// defines "propTypes" property in this component
UserProfile.propTypes = {
	name: PropTypes.string.isRequired, // expects string and is required
	hobbies: PropTypes.arrayOf(propTypes.string), // expects array of string
	address: PropTypes.shape({
		street: PropTypes.string,
		city: PropTypes.string
	}) // must be an object with 'street' and 'city' fields
}
```
Here we have defined the **propTypes** property and assigned an object, each key in this object represents the name of the **props** the user of this component can pass, the value defines the *type* of the **props**, such as: **string**, **number**, and **array**, all **props** are optional user of the component doesn't have to pass them except the one that hase **.isRequired**, here's a quick explanation on three **props** defined above:

* **name**: It expects the value of this **props** to be a **string** and it's required because, well, it has **.isRequired**.
* **hobbies**: It is optional but if passed it must be an array of strings.
* **address**: IT's also optional but if passed it must be an object with two fields **street** and **city** and both of them must be string.

There are just some examples of what you can do to enable type checking, there are plenty more types you can define [The Documentation](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes).

### Default Props
I some cases you might want to define a default value for a **props** in case it is not passed to you, you can use **defaultProps** property to define your defaults, with this you're basically saying, "if someone doesn't pass me a value for a **props** that I'm expecting, then I want the value of that **props** to be what I have defined in the **defaultProps**", for example:
```javascript
import React from 'react';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
	render(){
		// if this props is not passed, it will print default value as defined by `defaultProps`
		console.log(this.props.hobbies);

		// if this props is not passed, it will print `undefined` because we haven't defined any default value for this props
		console.log(this.props.address);
		return (...)
	}
}

// defines "defaultProps" property in this component
UserProfile.defaultProps = {
	hobbies: ['Reading Book']
}
```
Let's assume the user has not pass any value for **hobbies** in component, then it will be defaulted to ["Reading Book"], and also if the user of the component does't pass any value for **address** then it will resolve to `undefined` because we haven't defined the default value.

#### Component API

There are React component API, there are three methods: **setState()**, **forceUpdate**, and **ReactDOM.findDOMNode()**, in new ES6 classes, we have to manually bind this, we will use **this.method.bind(this)** in the following example

**Force Update:**

Sometimes we might want to update the component manually, this can be achieved using the **forceUpdate()** method.
```javascript
import React from 'react';

class RandomComponent extends React.Component {
	constructor(){
		super();
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
	}
	forceUpdateHandler(){
		this.forceUpdate();
	}
	render(){
		return (
			<div>
				<button onClick={this.forceUpdateHandler}>Force Update</button>
				<p>Random Number: {Math.random()}</p>
			</div>
		);
	}
}

export default RandomComponent;
```

**Find DOM Node:**

For DOM manipulating, you can use ReadDOM.FindDOMNode() method, after importing `react-dom`.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class FindDOMNodeComponent extends React.Component {
	constructor(){
		super();
		this.findDOMNodeHandler = this. findDOMNodeHandler.bind(this);
	}
	findDOMNodeHandler() {
		var customDiv = document.getElementById("customDiv");
		ReactDOM.findDOMNode(customDiv).style.color = '#ff0000';
	}
	render(){
		return (
			<div>
				<button onClick={this.findDOMNodeHandler}>Find DOM Node</button>
				<div id="customDiv" >MyNode</div>
			</div>
		)
	}
}

export default FindDOMNodeComponent;
```
the color will be changed to `red` in **customDiv**, once button is clicked.

Note: Since the 0.14 update, most of the older component API methods are deprecated or removed to accommodate ES6.