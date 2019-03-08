## Introduction to JSX

In the previous section we created our first Hello World function component, we returned **React.createElement** from the function to tell React what the DOM should look like when we render this component, another alternative way of telling React what the DOM should look like is by using JSX syntax, it is very common and recommended way also it is preferred over `React.createElement` syntax in most cases to write React code, JSX is a funny looking syntax though, it's not purely HTML, it's not purley JavaScript, but it's an extension of JavaScript where you can write HTML like syntax with full power of JavaScript.

Example: the equivalent of return statement we saw in previews section using React.createElement in JSX would be:
```javascript
return (
	<div>Hello World</div>
)
```
Instead of returning JavaScript code, it's returning HTML-like code (but it is not HTML) and notice it's not string also, it is JSX!

Although you write HTML looking syntax, your JSX code is compiled into a Javascript function like the one we saw in the previous section, the above JSX syntax compiled into:
```javascript
return React.createElement('div', null, 'Hello World');
```
Both of these codes will generate exactly same output on browser, Here HTML example below:
```html
<table>
    <thead>
        <th>
            <td>Col</td>
        </th>
    </thead>
    <tbody>
        <tr>
            <td>Cell</td>
        </tr>
    </tbody>
</table>
```

You'd have to write something like this, which is not very pretty

```javascript
React.createElement('table', null, 
    [
        React.createElement('thead', null, 
            React.createElement('th', null,
                React.createElement('td', null, 'Col')
            )
        ),
        React.createElement('tbody', null, 
            React.createElement('tr', null,
                React.createElement('td', 'null', 'Cell')
            )
        )
    ]
```

That's why JSX will be easy to use, and will make React code more elegant and readable.

Since JSX is technically Javascript it is pretty powerful in many sense. It can do everything that Javascript can do.

If you want to execute any Javascript code within JSX then you surround your Javascript code with curly braces **{ //javascript code }** and put it inside anywhere in JSX. It will evaluate your code everytime it renders the component to find out what it should render on the browser.

```javascript
function Company(props) {
	cosnt ticker = "APPL";
	const profileInfo = {
		'Company Name': 'Apple Inc',
		'Exchange': 'Nasdaq',
        'Sector': 'Technology',
        'Industry': 'Computer Hardware',
        'CEO': 'Timothy D. Cook'
	};

	return (
		<div>
			<div>Profile of: {ticker}</div>
			<div>
				{
					Object.keys(companyProfileInfo)
                        .map((key, index) => {
                            return <div>{key}: {companyProfileInfo[key]}</div>
                        })
				}
			</div>
		</div>
	)
}
```

The output HTML of above Component after rendering will be:

```html
<div>
    <div>Profile of: APPL</div>
    <div>
        <div>Company Name: Apple Inc.</div>
        <div>Exchange: Nasdaq</div>
        <div>Sector: Technology</div>
        <div>Industry: Computer Hardware</div>
        <div>CEO: Timothy D. Cook</div>
    </div>
</div>
```
This is so handfull using JSX, **a component must return one and only one enclosing tag**.

### Illegal usage in React

This is illegal in React since the return has more than one tag
```javascript
return ( 
    <div></div>
    <div></div>
)
```
This is perfectly legal because there is just one enclosing tag and it can have as many children as it likes

```javascript
return (
    <div>
        <div>
            <div></div>
        </div>
        <div></div>
    </div>
)
```
If you don't want to wrap your component with some enclosing tag like `div` you can wrap everything with `React.Fragment` which is a empty tag provided by React
```javascript
import { Fragment } from 'react';

return (
    <Fragment>
        <div></div>
        <div></div>
    </Fragment>
)
```

### Styles
In HTML styles are passed as string. The css properties are kebab-cased.
```html
<div style="bottom-border: 1px solid green"></div>
```
In JSX, styles are passed as an object. The css properties are camelCased.
```javascript
<div style={{ bottomBorder: `1px solid green`}}></div>
```
### Classes
In HTML class attribute is passed as string.
```html
<div class="container"></div>
```
In JSX also class attribute is passed as string but instead of calling it **class** we call it **className**. That's because JSX is extension of Javascript and "class" is a reserved keyword in Javascript.
```javascript
<div className={"container"}></div>
```

### Event Handler 
In HTML event handler attribute is all lower cased and the handlers are passed as string.
```html
<div onclick="clickHandler()"></div>
```
In JSX, event handler are camelCased and instead of string we pass the actual function.
```javascript
<div onClick={function(){ alert('clicked')}}></div>
```
We will look more into event hanlder later in this tutorial.