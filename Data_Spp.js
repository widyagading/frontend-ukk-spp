import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

export default class Data_Spp extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      dataSpp: [],
      id_spp: null,
      nominal: null,
      tahun: null,
      updateId: "",
      updateTahun: "",
      updateNominal: "",
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("userData")).level) {
      this.props.history.push("/404");
    }

    this.dataSpp();
  }

  dataSpp = () => {
    this.setState({
      isLoaded: false,
    });

    let url = base_url + "/spp";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataSpp: response.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  insertSpp = (event) => {
    event.preventDefault();
    if (this.state.id_spp && this.state.tahun && this.state.nominal) {
      let sendData = {
        id_spp: this.state.id_spp,
        tahun: this.state.tahun,
        nominal: this.state.nominal,
      };

      let url = base_url + "/spp/add";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.inserted) {
            swal("Berhasil menambahkan data spp!", {
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            swal("Failed insert data! \n" + response.data.message, {
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

  deleteSpp = (idSpp) => {
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

        let url = base_url + "/spp/" + idSpp;

        axios
          .delete(url)
          .then((response) => {
            if (!response.data.deleted) {
              alert("Failed delete data! \n" + response.data.message);
            }
          })
          .catch((error) => {
            alert("ERROR \n" + error);
            console.log(error);
          });
      }
    });
  };

  updateModal = (idSpp, tahun, nominal) => {
    this.setState({
      updateId: idSpp,
      updateTahun: tahun,
      updateNominal: nominal,
    });
  };

  updateSpp = (event) => {
    event.preventDefault();
    if (
      this.state.updateId &&
      this.state.updateTahun &&
      this.state.updateNominal
    ) {
      let sendData = {
        id_spp: this.state.updateId,
        tahun: this.state.updateTahun,
        nominal: this.state.updateNominal,
      };

      let url = base_url + "/spp/update";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.updated) {
            swal("Berhasil mengubah data spp!", {
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
                  <h4 className="text-white m-0">Data SPP</h4>
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
                          <th scope="col">ID SPP</th>
                          <th scope="col">Tahun</th>
                          <th scope="col">Nominal</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataSpp.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.id_spp}</td>
                              <td>{item.tahun}</td>
                              <td>{item.nominal}</td>
                              <td>
                                <button
                                  data-toggle="modal"
                                  data-target="#updateModal"
                                  className="btn btn-warning mr-2"
                                  onClick={() =>
                                    this.updateModal(
                                      item.id_spp,
                                      item.tahun,
                                      item.nominal
                                    )
                                  }
                                >
                                  Ubah
                                </button>
                                <button
                                  onClick={() => this.deleteSpp(item.id_spp)}
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
                <h5 className="modal-title">Insert Data SPP</h5>
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
                  <label htmlFor="inputIdspp">ID SPP</label>
                  <input
                    value={this.state.id_spp}
                    onChange={(ev) =>
                      this.setState({ id_spp: ev.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="inputIdspp"
                    placeholder="ID SPP"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputTahun">Tahun</label>
                  <input
                    value={this.state.tahun}
                    onChange={(ev) => this.setState({ tahun: ev.target.value })}
                    type="number"
                    className="form-control"
                    id="inputTahun"
                    placeholder="Tahun"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputNominal">Nominal</label>
                  <input
                    value={this.state.nominal}
                    onChange={(ev) =>
                      this.setState({ nominal: ev.target.value })
                    }
                    type="number"
                    className="form-control"
                    id="inputNominal"
                    placeholder="Nominal"
                    min="0"
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
                <form onSubmit={(ev) => this.insertSpp(ev)}>
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
                <h5 className="modal-title">Update Data SPP</h5>
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
                  <label className="col-form-label">Tahun:</label>
                  <input
                    value={this.state.updateTahun}
                    onChange={(ev) =>
                      this.setState({ updateTahun: ev.target.value })
                    }
                    type="number"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">Nominal:</label>
                  <input
                    value={this.state.updateNominal}
                    onChange={(ev) =>
                      this.setState({ updateNominal: ev.target.value })
                    }
                    type="number"
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
                <form onSubmit={(ev) => this.updateSpp(ev)}>
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
