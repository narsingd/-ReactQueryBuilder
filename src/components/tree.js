import React, { Component } from 'react';
import QueryCondtion from './condition';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

const firstNames = [
  'Abraham',
  'Adam',
  'Agnar',
  'Albert',
  'Albin',
  'Albrecht',
  'Alexander',
  'Alfred',
  'Alvar',
  'Ander',
  'Andrea',
  'Arthur',
  'Axel',
  'Bengt',
  'Bernhard',
  'Carl',
  'Daniel',
  'Einar',
  'Elmer',
  'Eric',
  'Erik',
  'Gerhard',
  'Gunnar',
  'Gustaf',
  'Harald',
  'Herbert',
  'Herman',
  'Johan',
  'John',
  'Karl',
  'Leif',
  'Leonard',
  'Martin',
  'Matt',
  'Mikael',
  'Nikla',
  'Norman',
  'Oliver',
  'Olof',
  'Olvir',
  'Otto',
  'Patrik',
  'Peter',
  'Petter',
  'Robert',
  'Rupert',
  'Sigurd',
  'Simon',
];

export default class Tree extends Component {

  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'Peter Olofsson' }, { title: 'Karl Johansson' }],
    };
  }

  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const getRandomName = () =>
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const tableRows = () => firstNames.map((name) => {
      return (<tr>
                <td>{name} {name}sson</td>
                <td>String</td>
                <td><button className="btn btn-info"
                  onClick={() =>
                    this.setState(state => ({
                      treeData: state.treeData.concat({
                        title: `${getRandomName()} ${getRandomName()}sson`,
                        op: 1,
                        value: ''
                      }),
                    }))
                  }
                >
                  Add
                </button></td>
              </tr>);
    });
    return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 tree">
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            generateNodeProps={({ node, path }) => ({
              title: (
                <div className="container-fluid" >
                <div className="row">
                  <div className="col-sm-4">{node.title}</div>
                  <div className="col-sm-4" >
                    <select className="custom-select" value="0">
                      <option value="0">Choose...</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <input value={node.value} />
                  </div>
                </div>
                </div>
              ),
              buttons: [
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }))
                  }
                >
                  Remove
                </button>,
              ],
            })}
          />
        </div>
        <div className="col-lg-4 table-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Datatype</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {tableRows()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
