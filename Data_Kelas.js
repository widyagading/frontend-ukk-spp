import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

export default class Data_Kelas extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      dataKelas: [],
      id_kelas: null,
      nama_kelas: "",
      kompetensi_keahlian: "",
      updateId: "",
      updateNama: "",
      updateKompetensi: "",
    };
  }

  componentDidMount() {
    this.dataKelas();
  }

  dataKelas = () => {
    let url = base_url + "/kelas";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataKelas: response.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  insertKelas = (event) => {
    event.preventDefault();
    if (
      this.state.id_kelas &&
      this.state.nama_kelas &&
      this.state.kompetensi_keahlian
    ) {
      let sendData = {
        id_kelas: this.state.id_kelas,
        nama_kelas: this.state.nama_kelas,
        kompetensi_keahlian: this.state.kompetensi_keahlian,
      };

      let url = base_url + "/kelas/add";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.inserted) {
            swal("Berhasil menambahkan data kelas!", {
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

  deleteKelas = (idKelas) => {
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

        let url = base_url + "/kelas/" + idKelas;

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

  updateModal = (id, nama, kompetensi) => {
    this.setState({
      updateId: id,
      updateNama: nama,
      updateKompetensi: kompetensi,
    });
  };

  updateKelas = (event) => {
    event.preventDefault();
    if (
      this.state.updateId &&
      this.state.updateNama &&
      this.state.updateKompetensi
    ) {
      let sendData = {
        id_kelas: this.state.updateId,
        nama_kelas: this.state.updateNama,
        kompetensi_keahlian: this.state.updateKompetensi,
      };

      let url = base_url + "/kelas/update";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.updated) {
            swal("Berhasil mengubah data kelas!", {
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
                  <h4 className="text-white m-0">Data Kelas</h4>
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
                          <th scope="col">ID Kelas</th>
                          <th scope="col">Nama Kelas</th>
                          <th scope="col">Kompetensi Keahlian</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataKelas.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.id_kelas}</td>
                              <td>{item.nama_kelas}</td>
                              <td>{item.kompetensi_keahlian}</td>
                              <td>
                                <button
                                  data-toggle="modal"
                                  data-target="#updateModal"
                                  className="btn btn-warning mr-2"
                                  onClick={() =>
                                    this.updateModal(
                                      item.id_kelas,
                                      item.nama_kelas,
                                      item.kompetensi_keahlian
                                    )
                                  }
                                >
                                  Ubah
                                </button>
                                <button
                                  onClick={() =>
                                    this.deleteKelas(item.id_kelas)
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
                <h5 className="modal-title">Tambah Data Kelas</h5>
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
                  <label for="inputIdkelas">ID Kelas</label>
                  <input
                    value={this.state.id_kelas}
                    onChange={(ev) =>
                      this.setState({ id_kelas: ev.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="inputIdkelas"
                    placeholder="ID Kelas"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label for="inputName">Nama Kelas</label>
                  <input
                    value={this.state.nama_kelas}
                    onChange={(ev) =>
                      this.setState({ nama_kelas: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Nama Kelas"
                  />
                </div>

                <div className="form-group">
                  <label for="inputKompetensi">Kompetensi Keahlian</label>
                  <input
                    value={this.state.kompetensi_keahlian}
                    onChange={(ev) =>
                      this.setState({
                        kompetensi_keahlian: ev.target.value,
                      })
                    }
                    type="text"
                    className="form-control"
                    id="inputKompetensi"
                    placeholder="Kompetensi Keahlian"
                  />
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
                <form onSubmit={(ev) => this.insertKelas(ev)}>
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
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Data Kelas</h5>
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
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">Kompetensi Keahlian:</label>
                  <input
                    value={this.state.updateKompetensi}
                    onChange={(ev) =>
                      this.setState({ updateKompetensi: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                  />
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
                <form onSubmit={(ev) => this.updateKelas(ev)}>
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
