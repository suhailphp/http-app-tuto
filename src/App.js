import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount(){
    let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    this.setState({posts:response.data})
  }
  handleAdd = async() => {
    let obj = {title:'test',data:'test data'}
    let response = await axios.post('https://jsonplaceholder.typicode.com/posts',obj)
    let posts = [response.data,...this.state.posts]
    this.setState({posts})
  };

  handleUpdate = async post => {
    post.title = 'Titel is updated';
    let response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,post)
    let posts = [...this.state.posts]
    posts[posts.indexOf(post)] = {...response.data}
    this.setState({posts})
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
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
