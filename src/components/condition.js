import React, { Component } from 'react';

export default class QueryCondtion extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
            Test
          </div>
          <div className="col-sm-4">
            <select className="custom-select" id="inputGroupSelect02" >
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-sm-4">
          <input style={{ fontSize: '1.1rem' }} value="{node.name}" />
          </div>
        </div>
      </div>
    );
  }
}
