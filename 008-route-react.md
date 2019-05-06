## Route with ReactJS

React Route v4 is a pure React rewrite of the popular React package, Previous versions of React Router used configuration disguised as pseudo-components and could be difficult to understand, With v4, everything is just a **components**.

### Single-Page application:

Here you can build a single-page web application (SPA), so what is a Single-Page application?

A single-page application is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.
In other hand, a single-page application is an app that works inside a browser and does not require page reloading during use. You are using this type of applications every day.

* SPA is fast, as most resources (HTML, CSS, Scripts) are only loaded once throughout the lifespan of application, only data is transmitted back and forth.
* The development is simplified and streamlined. There is no need to write code to render pages on the server.
* Also SPA are easy to debug, as you can monitoring network operations, investigate page elements and data associated with it.
* It's easier to make a mobile application because the developer can reuse the same backend code for web application and native mobile application.
* Also SPA can cache any local storage effectively, an application sends onyl one request, store all data, then it can use this data and works even offline.
* There non-benefits of SPA, it is very tricky and not an easy task to make SEO optimization, most of content is loaded by AJAX (Asynchronous JavaScript and XML), a method of exchange data and updating in the application without refreshing the page.
* IT is slow to download because heavy client frameworks are required to by loaded to the client.
* IT requires JavaScript to be present and enabled, if any user disables JavaScript on browser, it won't be possible to present application and its actions in a correct way.
* SPA it less secure, Due to Cross Site Scripting (XSS), compared to the traditional application, it enables attachers to inject client-side scripts into web application by other users.
* Memory leak in JavaScript can even cause powerful system to slow down.

### Multi-Page application:

MPA work in a "traditional" way, every change happened as display the data or submit data back to server requests rendering a new page from the server in the browser. These applications are large, bigger than SPAs because they need to be. Due to the amount of content, these applications have many levels of UI, Luckily, it's not a problem anymore because we have AJAX, we don't have to worry that big and complex applications have to transfer a lot of data between server and browser.This solution allows you to referesh only particular parts of the application, on the other hand, it adds more complexity and it is more difficult to develop than a SPA application.

* It's the perfect approach for users who need a visual map of where to go in the application. Solid, few level menu navigation is an essential part of traditional Multi-Page application.
* Very good and easy for proper SEO management, It gives better chances to rank for different keywords since an application can be optimized for one keyword per page.
* There is no option to use the same backend with mobile applications, then you need to write custom API as backend for mobile app.
* Frontend and backend development are tightly coupled.
* The development becomes quite complex. The developer needs to use frameworks for either client and server side, this results in the longer time of application development.

### installation

We will install `react-router-dom`

```sh
npm install -s react-router-dom
```

### Routing

When starting a new project, you need to determine which type of router to use, for browser based projects, there is three main types:

* `<BrowserRouter>` usually it is preferable, should be used when you have a server that will handle dynamic requests (knows how to respond to any possible URI), your website will be hosted on a server than only serves static files.
* `<HashRouter>` should be used for static websites (Where the server can only respond to requests for files that it knows about).
* `<MemoryRouter>` it is used to disable subpages in url, it's appear like one page on site e.g. `https://web.whatsapp.com`.

### History

Each router creates a history object, which it uses to keep track of the current location, and re-render the website whenever that changes, the other components provides by React Router rely on having that history object available through React's context, so they must be rendered as descendants of a router component, A React Router component that does not have a router as one of its ancestors will fail to work.

### Rendering a <Router>

Router components ony expect to receive a single child element, to work within this limitation, it is useful to create an `<App>` component that renders the rest of your application, separating your application from the router is also useful for server rendering because you can re-use the `<App>` on the server while switching the router to a `<MemoryRouter>`.

```jsx
import { BrowserRouter } from 'react-router-dom';

const App = () => {
	return (
		<div>Hello</div>
	)
}

ReactDOM.render((
	<BrowserRouter>
		<App />
	</BrowserRouter>
), document.getElementById('root'));

```

### Routes

The `<Route>` component is the main building block of React Router, anywhere that you want to only render content based on the location's pathname, you should use a `<Route>` element.

#### Path

A `<Route>` expects a path prop, which is a string that describes the pathname that route matches, for exmaple, `<Route path='/home' />` should match a pathname that begins withe `/home`, when the current location's pathname is matched by the path, the route will render a React element, when the path does not match the route will not render anything.
```jsx
import About from './components/about';
import Home from './components/home';

...

<BrowserRouter>
	<Route path='/' exact component={Home} />
	<Route path='/about' component={About} />
</BrowserRouter>
```
**Note:** When it comes to matching routes, React Router only cares about the pathname of a location:
```
http://www.example.com/home?extra=one
```
the only part that React Router attempts to match is `/home`.

#### Matching paths

React Router uses the `path-to-regexp` package to determine if a route element's path prop matches the current location. It compiles the path string into a regular expression, which will be matched against the location's pathname, `path` string have more advanced formattings options than will be covered here, you can read about them in the `path-to-regexp` document.

When the route's path matches, a match object with the following properties will be created:

-------- | --------------------------------------------------------------------------------------
 url     | the matched part of the current location's pathname                                   
 path    | the route's path                                                                      
 isExact | path === pathname                                                                     
 params  | an object containing values from the pathname that were captured by `path-to-regexp`  

You can use this route tester to play around with matching routes to URLs.

**Note:** Currently, a route's path must be absolute.

### Creating routes
`<Route>` can be created anywhere inside of the router, but often it makes sense to render them in the same place, you can use the `<Switch>` component to group `<Route>`, The `<Switch>` will iterate over its children elements (the routes) and only render the first one that matches the current pathname.

----------- | ----------------
 /          | the home page   
 /posts     | the posts page  
 /posts/:id | a post item page
 /profile   | profile page    

In order to match a path in our application, all that we have to do is create a `<Route>` element with the path prop we want to match.

```jsx
<Switch>
	<Route path='/' exact component={Home} />
	<Route path='/posts' exact component={Post} />
	<Route path='/posts/:id' component={PostItem} />
	<Route path='/profile' component={Profile} />
</Switch>
```

### What does the `<Route>` render?

Routes have three props that can be used to define what should be rendered when the route's path matches. Only one should be provided to a `<Route>` element.

1. `component` a React component, when a route with a component prop matches, the route will return a new element whose type is the provided React component (created using `React.createElement`).
2. `render` a function that returns a React element, it will be called when the path matches, this is similar to `component`, but it useful for inline rendering and passing extra props to the element.
3. `children` a function that returns a React elemen, unlike the prior two props, this will always be rendered, regardless of whether the route's path matches the current location.

```jsx
<Route path='/' component={Home} />
const extraProps = { color: '#ff0000' }
<Route path='/page' render={(props) => (
	<Page {...props} data={extraProps} />
)} />
<Route path='/anotherPage' children={(props) => (
	props.match ?
	<Page {...props} /> :
	<EmptyPage {...props} />
)} />
```

### Links

Application needs a way to naviaget between pages, if we were to create links using anchor elements `<a>`, clicking on them would cause the whole page to reload. React Router provides a <Link> component to prevent that from happening.

When clicking a `<Link>`, the URL will be updated and the rendered content will change without reloading the page.

```jsx
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<nav>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/posts'>Posts</Link></li>
					<li><Link to='/profile'>Profile</Link></li>
				</ul>
			</nav>
		</header>
	);
}
```

`<Link>`s use the `to` prop to describe the location that they should navigate to, this can either be a string or a location object (containing a combination of `pathname`, `search`, `hash` and `state` properties), when it is a string, it will be converted to a location object.

```jsx
<Link to={{ pathname: '/posts/20' }}>Post Item 20</Link>
```

### Annotations

1. Locations are objects with properties to describe the different parts of a URL:
```js
// a basic location object
{ pathname: '/', search: '', hash: '', key: '123', state: {} }
```
2. You can render a pathless `<Route>`, which will match every location, this can be useful for accessing methods and variables that are stored in the context.
3. If you use the `children` props, the route will render even when its path does not match the current location.
4. There is work being done to add support for relative `<Route>`s and `<Link>`s. Relative `<Link>`s are more complicated than they might initially seem to be because they should be resolved using their parent `match` object, not the current URL.
5. This is essentially a function component, internally, the big different between the components passed to `component` and `render` is that `component` will use `React.createElement` to create the element, while `render` will call the component as a function, if you were to define an inline function and pass it to the `component` prop, it would be much slower than using the `render` prop.
```jsx
<Route path='/' component={Home} />
// React.createElement(props.component)
<Route path='/page' render={() => <Page />} />
// props.render()
```
6. The `<Route>` and `<Switch` components can both take a location prop, this allows them to be matched using a location that is different than the actual location (the current URL).
7. They are also passed a `staticContext` prop, but that is only useful when doing server side rendering.