import React, { Component } from "react";
import axios from "axios";
import Pagination from "./component/common/pagination";
import paginate from "./utils/paginate";
import "./App.css";

const ApiEndPoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
    pageSize: 10,
    pageNumber: 1,
  };

  handlePageChange = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };
  async componentDidMount() {
    const result = await axios(ApiEndPoint);
    this.setState({ posts: result.data });
  }
  handleAdd = async () => {
    let obj = { title: "new data", body: "new body" };
    try {
      let { data: post } = await axios.post(ApiEndPoint, obj);
      let posts = [post, ...this.state.posts];
      this.setState({ posts });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Expected error occured");
      } else {
        alert("Uexpected error occured, please try again");
        console.log("Error Log ", ex);
      }
    }
  };

  handleUpdate = async (post) => {
    let originalPost = { ...post };
    let posts = [...this.state.posts];
    post.title = "Title Updated for " + post.id;
    let index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    try {
      await axios.put(ApiEndPoint + "/" + post.id, post);
      //throw new Error("Something wrong in update");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("Invalid post ");
      } else {
        alert("Uexpected error occured, please try again");
        console.log("Error Log ", ex);
      }
      posts[index] = { ...originalPost };
      this.setState({ posts });
    }
  };

  handleDelete = async (post) => {
    let originalPosts = this.state.posts;
    let posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await axios.delete(ApiEndPoint + "/" + post.id);
      //throw new Error("Something wrong in Delete");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        //Expected error -> this will happen only the post already deleted
        alert("This post is already deleted");
      } else {
        //unexpected error ->in this case all other errors are un expected, user no need to see it
        alert("Uexpected error occured, please try again");
        //log the original error and show the user a friendly message
        console.log("Error Log ", ex);
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    const { length: count } = this.state.posts;
    const { pageNumber, pageSize, posts: allPosts } = this.state;

    const posts = paginate(allPosts, pageNumber, pageSize);
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
            {posts.map((post) => (
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
        <Pagination
          pageSize={pageSize}
          totalRecords={count}
          onPageChange={this.handlePageChange}
          pageNumber={pageNumber}
        />
      </React.Fragment>
    );
  }
}

export default App;
