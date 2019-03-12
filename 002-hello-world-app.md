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


## Install ReactJS:

First of all we need to install webpack and babel.
**Webpack**: is a module bundler to manage and loads indenpendent modules, it is takes dependent modules and compiles them into single file called bundle, you cand use this bundle while developing apps using command line or by configuring in webpack.config.js file.

**Babek**: is a javascript compiler and transpiler that used to convert one source code to other, by this package you will be able to use the new ES6 features in your code then babel will converts it into plain old ES5 which can be run on all browsers.

### 1st step - create root folder:

after installing nodejs package open "Terminal" in Unix environment of "Command Prompt" in widows, then create folder called `helloworldapp`
```sh
mkdir helloworldapp && cd helloworldapp/
```
To initialize new nodejs model you need to generate `package.json` file:
```sh
npm init
```
The output will be like that:
```json
{
   "name": "helloworldapp",
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "keywords": [],
   "author": "",
   "license": "ISC"
}
```

### 2nd step - install React and ReactDOM, and other required packages:

We need to install `react` and `react-dom` as dom packages, you can add this packages to **package.json** file using **--save** option.
```sh
npm install --save react
npm install --save react-dom
```
Since we are using webpack to generate bundler so we need to install **webpack**, **webpack-dev-server**, **webpack-cli**, and **html-webpack-plugin**.
```sh
npm install --save webpack
npm install --save webpack-dev-server
npm install --save webpack-cli
npm install --save-dev html-webpack-plugin
```
Now we need to install babel package by install these packages: **babel-core**, **babel-loader**, **babel-preset-env**, **babel-preset-es2015**, and **babel-preset-react**.
```sh
npm install --save-dev babel-core
npm install --save-dev babel-loader
npm install --save-dev babel-preset-env
npm install --save-dev babel-preset-react
npm install --save babel-preset-es2015
```
### 3rd step creating files
Now we need to create required files.
```sh
touch App.js
touch main.js
touch index.html
touch webpack.config.js
touch .babelrc
```
### 4th step Write some settings

Open **webpack.config.js** file add the following code that represent the entry point of main.js, output path is the place where bundle app will be served, we are also setting the development server to 8000 port.
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8000
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}
```
Open the **package.json** and delete line **"echo \"Error: no test specified\" && exit 1"** inside "scripts" object because we do not needed, adding to lines instead:
```json
"start": "webpack-dev-server --mode development --open --hot",
"build": "webpack --mode production"
```
In **index.html** it is just a regular html, we need to add **id="app"** to `<div></div>` as a root element for this app and adding index_bundle.js which is our bundle app file.

```html
<!DOCTYPE html>
<html lang = "en">
   <head>
      <meta charset = "UTF-8">
      <title>React App</title>
   </head>
   <body>
      <div id = "app"></div>
      <script src = 'index_bundle.js'></script>
   </body>
</html>
```
Also we neet to add React Component to render **Hello World** in **App.js**.
```javascript
import React, { Component } from 'react';
class App extends Component{
   render(){
      return(
         <div>
            <h1>Hello World</h1>
         </div>
      );
   }
}
export default App;
```
Open **main.js** We need to import this component and render it in in App element.
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

ReactDOM.render(<App />, document.getElementById('app'));
```
Remember, whenever you want to use something from another file you neet to **import** it, if you want to make the component usable in other parts of app you need to **export** it.

In **.babelrc** add the following content:
```json
{
   "presets":["env", "react"]
}
```
### Run server
After setup complete you can start the server by running the following command.
```sh
npm start
```
It will show the port you need to open in the browser, in this case `http://localhost:8000`, after open it, you will see **HelloWorld** in the browser, You could find source code in **codes** folder.