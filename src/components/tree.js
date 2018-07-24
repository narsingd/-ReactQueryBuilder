import React, { Component } from 'react';
import QueryCondtion from './condition';
import SortableTree, { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';

const attributes = [ 
  {name: 'employee_id', alias: 'Employee Id', type: 'Integer',  value: '', operator: '0', condition: '0' },
  {name: 'first_name', alias: 'First Name', type: 'String',  value: '', operator: '0', condition: '0' },
  {name: 'last_name', alias: 'Last Name', type: 'String',  value: '', operator: '0', condition: '0' },
  {name: 'job_id', alias: 'Job Id', type: 'Integer',  value: '', operator: '0', condition: '0' },
  {name: 'email', alias: 'Email', type: 'Email',  value: '', operator: '0', condition: '0' },
  {name: 'salary', alias: 'Salary', type: 'Float',  value: '', operator: '0', condition: '0' },
  {name: 'department_id', alias: 'Department Id', type: 'Integer',  value: '', operator: '0', condition: '0' }
];

export default class Tree extends Component {

  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ key: attributes[0].name,
                   condition: attributes[0].condition,
                   name: attributes[0].name,  
                   type: attributes[0].type, 
                   operator: attributes[0].operator, 
                   value: attributes[0].value,
                   isGroup: true
                  }]
    };
  }

  onValueChange(event, getNodeKey, path, node, state){
      const value = event.target.value;
      this.setState(state => ({
      treeData: changeNodeAtPath({
        treeData: state.treeData,
        path,
        getNodeKey,
        newNode: { ...node, value },
      }),
    }));  
  }

  onConditionChange(event, getNodeKey, path, node, state){
    const condition = event.target.value;
    this.setState(state => ({
    treeData: changeNodeAtPath({
      treeData: state.treeData,
      path,
      getNodeKey,
      newNode: { ...node, condition },
    }),
  }));  
}

onOperatorChange(event, getNodeKey, path, node, state){
  console.log(getNodeKey(path))
  console.log(path)
  console.log(node)
  const operator = event.target.value;
  this.setState(state => ({
  treeData: changeNodeAtPath({
    treeData: state.treeData,
    path,
    getNodeKey,
    newNode: { ...node, operator },
  }),
  }));  
}

renderTreeNode(node, getNodeKey, path, state) {
  if(node.isGroup){
    return (
      <div className="row" >
        <div className="col-sm-6" >
          group()
        </div>
      </div>
    )
  }else {
    return (
      <div className="row" >
        <div className="col-sm-2" >
          <select className="custom-select" value={node.condition} 
                  onChange={(event, state) =>{this.onConditionChange(event, getNodeKey, path, node, state)} }>
            <option value="0">AND</option>
            <option value="1">OR</option>
          </select>
        </div>
        <div className="col-sm-3">{node.name}</div>
        <div className="col-sm-4" >
          <select className="custom-select" value={node.operator}
                  onChange={(event, state) =>{this.onOperatorChange(event, getNodeKey, path, node, state)} } >
            <option value="0">Choose...</option>
            <option value="1">Equals</option>
            <option value="2">Not Equals</option>
            <option value="3">Greather than</option>
            <option value="4">Lesser than</option>
          </select>
        </div>
        <div className="col-sm-3">
          
          <input value={node.value} 
                  onChange={(event, state) =>{this.onValueChange(event, getNodeKey, path, node, state)} } />
        </div>
      </div>
    )
  }   
}


  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const getRandomName = () =>
      attributes[Math.floor(Math.random() * attributes.length)];
    const tableRows = () => attributes.map((attribute) => {
      return (<tr key={attribute.name}>
                <td>{attribute.name} </td>
                <td>{attribute.type}</td>
                <td><button className="btn btn-info"
                  onClick={() =>
                    this.setState(state => ({
                      treeData: state.treeData.concat({
                        key: `${getRandomName().name}`,
                        condition: `${getRandomName().condition}`,
                        name: `${getRandomName().name}`,
                        type: `${getRandomName().type}`,
                        value: `${getRandomName().value}`,
                        operator: `${getRandomName().operator}`
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
                {this.renderTreeNode(node, getNodeKey, path, this.state)}
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
        <div className="row">
          <button className="btn btn-info"
                  onClick={() =>
                    this.setState(state => ({
                      treeData: state.treeData.concat({
                        key: `${getRandomName().name}`,
                        condition: `${getRandomName().condition}`,
                        name: `${getRandomName().name}`,
                        type: `${getRandomName().type}`,
                        value: `${getRandomName().value}`,
                        operator: `${getRandomName().operator}`,
                        isGroup: true
                      }),
                    }))
                  }
          >
            Add Group
          </button>
        </div>
        <div className="row">
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
      </div>
    );
  }
}
