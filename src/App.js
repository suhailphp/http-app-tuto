import React, { Component } from "react";
import http from './services/httpService'
import config from './config.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";


class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    let response = await http.get(config.apiEndpoint)
    this.setState({posts:response.data})
  }
  handleAdd = async() => {
    let obj = {title:'test',data:'test data'}
    let response = await http.post(config.apiEndpoint,obj)
    let posts = [response.data,...this.state.posts]
    this.setState({posts})
  };

  handleUpdate = async post => {
    post.title = 'Titel is updated';
    let response = await http.put(config.apiEndpoint+post.id,post)
    let posts = [...this.state.posts]
    posts[posts.indexOf(post)] = {...response.data}
    this.setState({posts})
  };  

  handleDelete = async post => {
    const originalPost = this.state.posts;
    let posts = this.state.posts.filter(p=>p.id !== post.id)
    this.setState({posts})
    try{
      await http.delete(config.apiEndpoint+'dsfds/'+post.id)
    }
    catch(e){
      if(e.response && e.response.status === 404)
       
      this.setState({posts:originalPost})
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
