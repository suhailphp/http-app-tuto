import React, { Component } from "react";
import axios from "axios";
import "./App.css";

axios.interceptors.response.use(null,error=>{
  const expecedError = error.response && error.response.status >= 400 && error.response.status < 500;
  console.log(expecedError)
  if(!expecedError){
    alert('An unexpected error occured!')
    console.log('Error Logging:',error)
  }
  return Promise.reject(error)
})

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

  handleDelete = async post => {
    const originalPost = this.state.posts;
    let posts = this.state.posts.filter(p=>p.id !== post.id)
    this.setState({posts})
    try{
      await axios.delete(`https://jsonplaceholder.typicode.com/postsss/${post.id}`)
    }
    catch(e){
      if(e.response && e.response.status === 404)
        alert('This post already delted!')
      this.setState({posts:originalPost})
    }
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
