## Hello World App

First of all, write this component in new project.

```javascript
import React from 'react';

function HelloWorld(props){
	// function must return something
	return (
		// return should tell React tot render Hello World in the browser
	);
}
```

Now the next question what this function will be return?

The function is telling React what the DOM should look like when this component is rendered, in this case using **React.Component** approach instead of function approach in code above, it is what you return from **render** function on browser.

Here, let's say we want to render a **div** element that has **Hello World** text `<div>Hello World</div>`, we can use React to display the above *HTML* by using `React.createElement` function:

```javascript
return React.createElement('div', null, 'Hello World');
```
In another hand, we could say that by install **react-dom** package using `npm` using `ReactDOM`:

```javascript
ReactDOM.render(HelloWorld, document.getElementById('root'));
```
Here we are calling a function called **render** on **ReactDOM** object. The first argument of the function is the component you want to render - in our case **HelloWorld**. Second argument is a document selector. ReactDOM appends the component we want to display (first argument) as a child of the node returned by the selector (second argument).

[DOM Document Object Model](https://www.w3schools.com/js/js_htmldom.asp) is an object representation of the HTML, to see what it is looks like open chome broweser dev tools (Right Click + Inspect) and type `console.dir(document);` and hit enter, you will see a JSON-like tree structure with fields and methods, React for it's part maintains a copy of this DOM, what's called **Virtual DOM** named so because it's not a real one, it's a virtual copy, Why does React hold a copy of the DOM? The main reason it maintains a virtual copy of the DOM is to improve performance of the application. Web applications these days are very complex. User interacts with the app or the app fetches data and based on that the DOM is updated so that users sees the effects of their interaction or new data. This updating of DOM, however, is an expensive operation - creating and removing DOM nodes (like we did with `document.createElement('div')` above) are expensive. So React optimizes this updating operations using virtual DOM.

The way this roughly works is: when there's anything that will cause a UI to update (called re-render), React first updates it's virtual DOM instead of real DOM. Then it compares the virtual DOMs (before and after the update). It has heuristic algorithm to determine which piece of the DOM might have changed. Once it figures that out, it updates only the changed piece on the real DOM. Again the reason it does this is because updating the DOM is expensive operation and it wants to optimize this piece so it only updates what is absolutely necessary instead of tearing down the entire DOM and recreating it. 