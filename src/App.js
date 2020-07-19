import React, { Component } from "react";
import axios from "axios";
import Pagination from "./component/common/pagination";
import paginate from "./utils/paginate";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
    pageSize: 4,
    pageNumber: 1,
  };

  handlePageChange = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };
  async componentDidMount() {
    const result = await axios("https://jsonplaceholder.typicode.com/posts");
    this.setState({ posts: result.data });
  }
  handleAdd = () => {
    console.log("Add");
  };

  handleUpdate = (post) => {
    console.log("Update", post);
  };

  handleDelete = (post) => {
    console.log("Delete", post);
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
          <Pagination
            pageSize={pageSize}
            totalRecords={count}
            onPageChange={this.handlePageChange}
            pageNumber={pageNumber}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default App;
