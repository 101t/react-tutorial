## Questions about redux and flux:

#### 1. Why use Redux with React?

**Redux** works especially well with liberaries like **React** because they let you describe UI as a function of state, and **Redux** emits state updates in response to actions.

#### 2. Do you need to use Redux with React?

**Redux** is a state management tool, while it's mostly used with **React**, it can be used with any other JavaScript framework or library, with **Redux**, the state of your application is kept in a store and each component can access any state that it needs from this store.

#### 3. What is Redux used for?

**Redux** as JavaScript library for managing and maintaining application state usually **used in** conjunction with other frameworks to build applications, also it has main terms:

* **Store**: Refers to the application state container for the entire application
* **Action**: Refers to an explicit event that occurs within a Redux application that will impact application state
* **Container**: A React component that subscribes to specific *Reducer* updates and propagates data to other *React Components* known as presentation components
* **Immutability**: Refers to an object that cannot be changed once it has been created

#### 4. What is Dispatch in react redux?

As the second argument passed in to correct, `mapDispatchToProps` is used for **dispatching** actions to the store, **dispatch** is a function of the **Redux** stor, **React Redux** gives you two ways to let components **dispatch** actions. By default, a connected component receives `props.dispatch` and can **dispatch** actions itself.

#### 5. What is Flux and Redux in React?

**Flux** is a pattern and **Redux** is a library. In **Flux**, an action is a simple JavaScript object, and that's the default case in **Redux** too, but when using **Redux** middleware, actions can also be functions and promises, with **Flux** it is a convention to have multiple stores per application, each store is a singleton object.

#### 6. Do you really need Redux?

**Redux** is a good fit for a small applications, it actually doesn't require a lot of boiler code, but gives much. 
**Redux** is a good fit for a huge application, as long you control every part, you can test and reuse every part.

#### 7. What does react redux connect do?

Overview, the `connect()` function connects a React component to a Redux store, it provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store

#### 8. What is provider in react redux?

The `<Provider />` makes the **Redux** store available to any nested components that have been wrapped in the `connect()` function, since any React Component in a React Redux app can be connected, most applications will render a `<Provider />` at the top level, with the entire app's component tree inside of it.

#### 9. What is flux in ReactJS?

**Flux** is the application architecture that Facebook uses for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow. It's more of a pattern rather than a formal framework, and you cand start using **Flux** immediately without a lot of new code