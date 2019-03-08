## Introduction

A declarative, efficient, and flexible JavaScript library for building UI interfaces, React lets you build reusable components and compose them to build Web App.

### Component

Components are building block of your UO, it is similar to directives in angular, or modules / widgets in other frameworks, React are more or less self sufficient in that they constitutes the presentation (HTML) as well as the behavior such as event hanlders.
They are also composable meaning we can easily use one component within other component,

### How we can create component?

There are two way to create components.

#### 1. React Component:

Creating ES6 **class** and extend it from React.Component, each component created using **render** method that returns DOM should look like if this component is rendered on the browser.
```javascript
import React, { Component } from 'react';

class MyComponent extends Component {
	// needs render function
	render() {
		return (
			// return should tell React what the DOM should look like
            // if this component is rendered in the browser
		)
	}
}
```

#### 2. function:

Another common way to create a React component is to create a simple function that takes in a parameter **props** will be function's parameter and return the exact same thing as above, wah the DOM should look like when the rendered on the browser.

```javascript
function MyComponent(props) {
	return (
		//return should tell React what the DOM should look like
		//if this component is rendered in the browser
	)
}
```

Note: User-Defined Components Must Be Capitalized

When an element type starts with a lowercase letter, it refers to a built-in component like <div> or <span> and results in a string 'div' or 'span' passed to React.createElement. Types that start with a capital letter like <Foo /> compile to React.createElement(Foo) and correspond to a component defined or imported in your JavaScript file.

```

import React from 'react';

// Wrong! This is a component and should have been capitalized:
function hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Wrong! React thinks <hello /> is an HTML tag because it's not capitalized:
  return <hello toWhat="World" />;
}
```
To fix this, we will rename hello to Hello and use <Hello /> when referring to it:
```
import React from 'react';

// Correct! This is a component and should be capitalized:
function Hello(props) {
  // Correct! This use of <div> is legitimate because div is a valid HTML tag:
  return <div>Hello {props.toWhat}</div>;
}

function HelloWorld() {
  // Correct! React knows <Hello /> is a component because it's capitalized.
  return <Hello toWhat="World" />;
}

```
See link [link](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

We recommend naming components with a capital letter. If you do have a component that starts with a lowercase letter, assign it to a capitalized variable before using it in JSX.

The above two approaches are identical except there are certain things that React.Component can do that the function cannot do but we will park that for now and we'll come back to it later in this tutorial.