## React with Redux

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience.

The problem is when we write complex react app it become complex to manage state object when react app grows to multiple components.

<p align="center"><img src="https://github.com/101t/react-tutorial/blob/master/static/redux/with-without-redux.png" ></p>

```jsx
export default class Profile extends Component {
  constructor() {
    super()
    this.state = {user: {}, orgs: []}
  }
  render() {
    const { user, orgs } = this.state;
    return (
      <div>
      .
      .
      .
      </div>
    )
  }
}
```
Essentially Redux allows us to build React App as you are but delegate all the state and actions to Redux, with redux we can isolate store having state so all components can talk to it get required state object from it

### Three fundamental Principles:

1. Single source of truth:
The state of your whole application is stored in an object tree within a single store, this makes it easy to create universal apps.
```jsx
console.log(store.getState())

/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

2. State is read-only:
The only way to change the state is to emit an action, an object describing what happened, this ensures that neither the views nor the network callbacks will ever write directly to the state, all the changes are centralized and happen one by one in a strict order.
```jsx
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
})

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})
```

3. Changes are made with pure functions:
To specify how the state tree is transformed by actions, you write pure reducer, Reducer are just a pure function that take the previous state and an action, and return the next state, remember to return the new state objects, instead of mutating the previous state.
You can start with a single reducer, and as your app grows, split it off smaller reducers that manage specific parts of the state tree, reducer are just a function that control the order which they are called, pass additional data, or even make reusable reducers for common tasks such as pagination.

```jsx
import { combineReducers, createStore } from 'redux'

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETED_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
              completed: true
            })
        }
        return todo
      })
    default:
      return state
  }
}

const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)
```

We will have react app which will talk to redux for triggering action and getting state object from it.

> React App => Action => Redux Layer

> Redux Layer => State Object => React App

<p align="center"><img src="https://github.com/101t/react-tutorial/blob/master/static/redux/redux-on-react-components.png" ></p>

When we do integration with react then we need React-Redux as bridge library which can help us to allow communication between react components and redux library, because React and Redux does not have a direct relationship, **so Redux controls an app's state changes, while React renders the view of states.**

**So how do you use React and Redux together?** We do this by finding the top-level React components, and inside these components we will set Redux's state as the component's state, when these state changes, we will use our handy `setState` component to trigger a re-render. This way, React and Redux states will be bound together.

Once we have these `top-level` components, we can break them down into even smaller components by passing Redux states as React `props` to create the sub-components. However, these sub-components are not directly related to Redux, because their behavior is completely determined by `props`. Whether or not the `prop` came from Redux does not matter these sub-components.

Actually, the `top-level components` I’ve mentioned are officially called *Smart Components in Redux* and the `sub-components` are called Dumb Components. the `connect` function in *React-Redux* hooks together the Redux states and Smart Components. This is how it look like View is all about our react component and we have this redux store on which we are triggering actions and getting state object from there

<p align="center"><img src="https://github.com/101t/react-tutorial/blob/master/static/redux/react-redux-store-view.png" ></p>

**Now big question is how react and redux talk to each other ?**
If we want to link our React application with Redux store, we first have to let our app know that this store exists. This is where we come to the first major part of the react-redux library, which is the `Provider`.

> `Provider` is a React component given to us by the **react-redux** library, it serves just one purpose: to "provide" the store to its child components.

```jsx
//This is the store we create with redux's createStore method
const store = createStore(todoApp,{})// Provider is given the store as a prop
render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('app-node'))
```

Since the provider only makes the store accessible to it’s children, and we would ideally want our entire app to access the store, the most sensible thing to do would be to put our `App` component within `Provider`.

**connect**

Now that we have **provided** the redux store to app, now will connect our components to it. we established previously that there is no way to directly interact with the store, we can either retrieve data by obtaining its current state, or change its state by dispatching an action, this is precisely what `connect` does, consider this piece of code, which uses `connect` to map the stores state and dispatch to the props of a component:

```jsx
import {connect} from 'react-redux'

const TodoItem = ({todo, destroyTodo}) => {
  return (
    <div>
      {todo.text}
      <span onClick={destroyTodo}> x </span>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todo : state.todos[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    destroyTodo : () => dispatch({
      type : 'DESTROY_TODO'
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
```

`mapStateToProps` and `mapDispatchToProps` are both **pure functions** that are provided the stores **`state` and `dispatch`** respectively. Furthermore, both functions have to return an object, whose keys will then be passed on as the props of the component they are connected to.

<p align="center"><img src="https://github.com/101t/react-tutorial/blob/master/static/redux/state-dispatch.png" ></p>

In this case, `mapStateToProps` returns an object with only one key : **`todo`**, and `mapDispatchToProps` returns an object with the `destroyTodo` key.

The connected component (which is exported) provides `todo` and `destroyTodo` as props to `TodoItem`.

It’s important to note that only components within the `Provider` can be connected (In the above diagram, the connect is done through the Provider).

### Managing React State with Redux

Using `state` built in React components is very temping, but when application gets more complex and lots of parts have to communicate with each other debugging it becomes really hard task, it's difficult to see the data flow and how various components communicate.

In React, components can easily communicate withe their children by passing them props, and children can talk back by callback functions, but what if we need to notify neighbour or some faraway component?

<p align="center"><img src="https://github.com/101t/react-tutorial/blob/master/static/redux/react-data-flow-diagram.png" ></p>

Black arrows shows where communications goes just right and red arrows indicate where problems emerge.

### Redux has three principals:

1. Single source of truth
2. state is read-only
3. change can made with pure functions

The first rule says that there is only one place where all application state is stored.

The second rule implies that the state is **immutable**, which means that instead of mutating an existing object a new object with changed properties is created, this allows us to create predictable application.

The third rule says that reduces function has to be pure function, which means always returns the same result given same paramteres.

### Basic counter application using redux:

This application will have one field to display counter and two buttons to decrement and increment counter.

```jsx
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const reducer = (state = {counter: 0}, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {...state, counter: state.counter+1};
    case 'DECREMENT':
      return {...state, counter: state.counter-1};
    default:
      return state;
  }
};

const store = createStore(reducer, {counter: 0},window.devToolsExtension ? window.devToolsExtension() : undefined);

let Counter = ({counter, onIncrement, onDecrement}) =>
 (<div>
    <div>{counter}</div>
    <button onClick={onDecrement}>-</button>
    <button onClick={onIncrement}>+</button>
  </div>);
const mapStateToProps = (state) => {
  return {counter: state.counter};
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({type: 'INCREMENT'}),
    onDecrement: () => dispatch({type: 'DECREMENT'})
  }
}
Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider> , document.getElementById('root'));
```

