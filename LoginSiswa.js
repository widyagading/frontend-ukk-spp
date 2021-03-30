import React from "react";
import axios from "axios";
import { base_url } from "../config.js";

export default class LoginSiswa extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      message: "",
      logged: true,
    };

    if (localStorage.getItem("auth")) {
      props.history.push("/");
    }
  }

  Login = (event) => {
    event.preventDefault();
    let sendData = {
      username: this.state.username,
      password: this.state.password,
    };

    let url = base_url + "/auth/loginSiswa";

    axios
      .post(url, sendData)
      .then((response) => {
        this.setState({ logged: response.data.logged });
        if (this.state.logged) {
          let siswa = response.data.data;
          localStorage.setItem("userData", JSON.stringify(siswa));
          localStorage.setItem("auth", true);
          this.props.history.push("/");
        } else {
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <div className="w-100 h-100">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 px-5    px-md-0">
              <div className="card mb-3">
                <h4 className="card-header text-white bg-warning">
                  Login Siswa
                </h4>
                <div className="card-body">
                  <form onSubmit={(ev) => this.Login(ev)}>
                    <div className="form-group">
                      <label for="inputUsername">Username</label>
                      <input
                        value={this.state.username}
                        onChange={(ev) =>
                          this.setState({ username: ev.target.value })
                        }
                        type="name"
                        className="form-control"
                        id="inputUsername"
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-group">
                      <label for="inputPass">Password</label>
                      <input
                        value={this.state.password}
                        onChange={(ev) =>
                          this.setState({ password: ev.target.value })
                        }
                        type="password"
                        className="form-control"
                        id="inputPass"
                        placeholder="Password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-warning d-block mx-auto"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
              <a
                href="/login"
                className="btn btn-danger d-inline-block"
              >
                Ke Login Petugas
              </a>
              {!this.state.logged ? (
                <div className="alert alert-danger mt-1">
                  {this.state.message}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
