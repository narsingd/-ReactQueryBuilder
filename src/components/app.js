import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1>Hello World!</h1>
        <p>Resize the browser window to see the effect.</p>
        <div className="row">
          <div className="col-sm-3 lavender">
            <select class="custom-select" id="inputGroupSelect02">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-sm-6 lavender">.col-sm-6</div>
          <div className="col-sm-3 lavender">.col-sm-3</div>
        </div>
      </div>
    );
  }
}
