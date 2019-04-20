import React, { Component } from 'react';

class App extends Component {
  state = {
    username: "",
    password: "",
  }
  constructor(props){
    super(props);
    //this.submitHandle1 = this.submitHandle1.bind();
  }
  submitHandle = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    alert(`Usernae: ${username}, Password: ${password}`);
  }
  submitHandle1(e){
    alert("Hi");
  }
  render() {
    return (
      <div className="container row justify-content-center" style={{ paddingTop: '100px' }}>
        <div className="col-md-4 offset-md-2">
          <h3>Welcome to Login</h3>
          <div className="card card-default">
            <form className="card-body" onSubmit={this.submitHandle}>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" 
                  className="form-control"
                  onInput={(e)=> this.setState({username: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control"
                  onInput={(e)=> this.setState({password: e.target.value})}
                />
              </div>
              <button className="btn btn-default btn-block" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
