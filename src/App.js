import React, { Component } from "react";
import http from "./services/httpService";
import config from "./config.json";
import Pagination from "./component/common/pagination";
import paginate from "./utils/paginate";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const result = await http.get(config.ApiEndPoint);
    this.setState({ posts: result.data });
  }
  handleAdd = async () => {
    let obj = { title: "new data", body: "new body" };
    try {
      let { data: post } = await http.post(config.ApiEndPoint, obj);
      let posts = [post, ...this.state.posts];
      this.setState({ posts });
      toast("New data added");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Expected error occured");
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
      await http.put(config.ApiEndPoint + "/", post);
      toast.success("Data updated");
      //throw new Error("Something wrong in update");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Invalid post ");
      }
      posts[index] = { ...originalPost };
      this.setState({ posts });
    }
  };

  handleDelete = async (post) => {
    let originalPosts = this.state.posts;
    let posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    //toast("post deleted successfull");
    try {
      await http.delete(config.ApiEndPoint + "/" + post.id);
      toast("post deleted successfull");
      //throw new Error("Something wrong in Delete");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This post is already deleted");
      }
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    const { length: count } = this.state.posts;
    const { pageNumber, pageSize, posts: allPosts } = this.state;

    const posts = paginate(allPosts, pageNumber, pageSize);
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
