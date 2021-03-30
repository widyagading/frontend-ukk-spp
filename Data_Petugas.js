import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

export default class Data_Petugas extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      dataPetugas: [],
      id_petugas: null,
      nama_petugas: "",
      username: "",
      password: "",
      level: "petugas",
      updateId: "",
      updateNama: "",
      updateUsername: "",
      updatePassword: "",
      updateLevel: "",
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("userData")).level) {
      this.props.history.push("/404");
    }

    this.dataPetugas();
  }

  dataPetugas = () => {
    this.setState({
      isLoaded: false,
    });

    let url = base_url + "/petugas";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataPetugas: response.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  insertPetugas = (event) => {
    event.preventDefault();
    if (
      this.state.id_petugas &&
      this.state.nama_petugas &&
      this.state.username &&
      this.state.password &&
      this.state.level
    ) {
      let sendData = {
        id_petugas: this.state.id_petugas,
        nama_petugas: this.state.nama_petugas,
        username: this.state.username,
        password: this.state.password,
        level: this.state.level,
      };

      let url = base_url + "/petugas/add";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.inserted) {
            swal("Berhasil menambahkan data petugas!", {
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            alert("Failed insert data! \n" + response.data.message);
          }
        })
        .catch((error) => {
          alert("ERROR \n" + error);
          console.log(error);
        });
    } else {
      alert("ISI SEMUA FIELD");
    }
  };

  deletePetugas = (idPetugas) => {
    swal({
      title: "Apakah anda yakin ??",
      text: "data ini akan dihapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Data berhasil dihapus!", {
          icon: "success",
        }).then(() => {
          window.location.reload();
        });

        let url = base_url + "/petugas/" + idPetugas;

        axios
          .delete(url)
          .then((response) => {
            if (!response.data.deleted) {
              swal("Gagal delete data! \n" + response.data.message, {
                icon: "error",
              });
            }
          })
          .catch((error) => {
            swal("ERROR \n" + error, {
              icon: "error",
            });
            console.log(error);
          });
      }
    });
  };

  updateModal = (id, nama, username, password, level) => {
    this.setState({
      updateId: id,
      updateNama: nama,
      updateUsername: username,
      updatePassword: password,
      updateLevel: level,
    });
  };

  updatePetugas = (event) => {
    event.preventDefault();
    if (
      this.state.updateId &&
      this.state.updateNama &&
      this.state.updateUsername &&
      this.state.updatePassword &&
      this.state.updateLevel
    ) {
      let sendData = {
        id_petugas: this.state.updateId,
        nama_petugas: this.state.updateNama,
        username: this.state.updateUsername,
        password: this.state.updatePassword,
        level: this.state.updateLevel,
      };

      let url = base_url + "/petugas/update";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.updated) {
            swal("Berhasil mengubah data petugas!", {
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            swal("Failed update data! \n" + response.data.message, {
              icon: "error",
            });
          }
        })
        .catch((error) => {
          alert("ERROR \n" + error);
          console.log(error);
        });
    } else {
      alert("ISI SEMUA FIELD");
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row mt-4">
            <div className="col">
              <div className="card mb-4">
                <div className="card-header bg-danger d-flex align-items-center">
                  <h4 className="text-white m-0">Data Petugas</h4>
                  <button
                    data-toggle="modal"
                    data-target="#insertModal"
                    className="btn btn-primary ml-auto"
                  >
                    Tambah Data
                  </button>
                </div>
                <div className="card-body">
                  {!this.state.isLoaded ? (
                    <div className="d-flex justify-content-center">
                      <Loader
                        type="Bars"
                        color="orange"
                        height={75}
                        width={74}
                      />
                    </div>
                  ) : (
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">ID Petugas</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Username</th>
                          <th scope="col">Password</th>
                          <th scope="col">level</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataPetugas.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.id_petugas}</td>
                              <td>{item.nama_petugas}</td>
                              <td>{item.username}</td>
                              <td>{item.password}</td>
                              <td>{item.level}</td>
                              <td>
                                <button
                                  data-toggle="modal"
                                  data-target="#updateModal"
                                  className="btn btn-warning mr-2"
                                  onClick={() =>
                                    this.updateModal(
                                      item.id_petugas,
                                      item.nama_petugas,
                                      item.username,
                                      item.password,
                                      item.level
                                    )
                                  }
                                >
                                  Ubah
                                </button>
                                <button
                                  onClick={() =>
                                    this.deletePetugas(item.id_petugas)
                                  }
                                  className="btn btn-danger"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Insert */}
        <div
          className="modal fade"
          id="insertModal"
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tambah Data Petugas</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="inputIdpetugas">ID Petugas</label>
                  <input
                    value={this.state.id_petugas}
                    onChange={(ev) =>
                      this.setState({ id_petugas: ev.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="inputIdpetugas"
                    placeholder="ID Petugas"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputName">Nama Petugas</label>
                  <input
                    value={this.state.nama_petugas}
                    onChange={(ev) =>
                      this.setState({ nama_petugas: ev.target.value })
                    }
                    type="name"
                    className="form-control"
                    id="inputName"
                    placeholder="Nama Petugas"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputUsername">Username</label>
                  <input
                    value={this.state.username}
                    onChange={(ev) =>
                      this.setState({ username: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="Username"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input
                    value={this.state.password}
                    onChange={(ev) =>
                      this.setState({ password: ev.target.value })
                    }
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputLevel">Level</label>
                  <select
                    value={this.state.level}
                    className="form-control"
                    id="inputLevel"
                    onChange={(ev) => this.setState({ level: ev.target.value })}
                  >
                    <option value="admin">Admin</option>
                    <option value="petugas">Petugas</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>

                <form onSubmit={(ev) => this.insertPetugas(ev)}>
                  <button
                    type="submit"
                    className="btn btn-danger d-block ml-auto"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Update */}
        <div
          className="modal fade"
          id="updateModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Data Petugas</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label">Nama:</label>
                  <input
                    value={this.state.updateNama}
                    onChange={(ev) =>
                      this.setState({ updateNama: ev.target.value })
                    }
                    type="name"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">Username:</label>
                  <input
                    value={this.state.updateUsername}
                    onChange={(ev) =>
                      this.setState({ updateUsername: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">Password:</label>
                  <input
                    value={this.state.updatePassword}
                    onChange={(ev) =>
                      this.setState({ updatePassword: ev.target.value })
                    }
                    type="password"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">Level:</label>
                  <select
                    value={this.state.updateLevel}
                    className="form-control"
                    onChange={(ev) =>
                      this.setState({ updateLevel: ev.target.value })
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="petugas">Petugas</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <form onSubmit={(ev) => this.updatePetugas(ev)}>
                  <button type="submit" className="btn btn-warning">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
