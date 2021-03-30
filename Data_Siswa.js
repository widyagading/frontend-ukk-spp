import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import Loader from "react-loader-spinner";
import swal from "sweetalert";

export default class Data_Siswa extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      dataSiswa: [],
      dataSpp: [],
      dataKelas: [],
      id_kelas: null,
      id_spp: 1,
      nama: "",
      nisn: null,
      nis: null,
      alamat: "",
      no_telpon: "",
      username: "",
      password: "",
      updateNisn: "",
      updateNis: "",
      updateNama: "",
      updateSpp: "",
      updateAlamat: "",
      updateKelas: "",
      updateTelepon: "",
      updateUsername: "",
      updatePassword: "",
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("userData")).level) {
      this.props.history.push("/404");
    }

    this.dataSiswa();
    this.dataSpp();
    this.dataKelas();
  }

  dataSiswa = () => {
    this.setState({
      isLoaded: false,
    });

    let url = base_url + "/siswa";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataSiswa: response.data.data,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  dataSpp = () => {
    let url = base_url + "/spp";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataSpp: response.data.data,
            id_spp: response.data.data[0].id_spp,
          });
        }
      })
      .catch((error) => {
        alert("ERROR \n" + error);
        console.log(error);
      });
  };

  dataKelas = () => {
    let url = base_url + "/kelas";

    axios
      .get(url)
      .then((response) => {
        if (response) {
          this.setState({
            isLoaded: true,
            dataKelas: response.data.data,
            id_kelas: response.data.data[0].id_kelas,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  insertSiswa = (event) => {
    event.preventDefault();
    if (
      this.state.id_kelas &&
      this.state.id_spp &&
      this.state.nama &&
      this.state.nisn &&
      this.state.nis &&
      this.state.alamat &&
      this.state.no_telpon &&
      this.state.username &&
      this.state.password
    ) {
      let sendData = {
        id_kelas: this.state.id_kelas,
        id_spp: this.state.id_spp,
        nama: this.state.nama,
        nisn: this.state.nisn,
        nis: this.state.nis,
        alamat: this.state.alamat,
        no_telpon: this.state.no_telpon,
        username: this.state.username,
        password: this.state.password,
      };

      let url = base_url + "/siswa/add";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.inserted) {
            swal("Berhasil menambahkan data siswa!", {
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            alert("Failed insert data! \n" + response.data.message);
          }
        })
        .catch((error) => console.log(error));
    } else {
      alert("ISI SEMUA FIELD");
    }
  };

  deleteSiswa = (nisn) => {
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

        let url = base_url + "/siswa/" + nisn;

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

  updateModal = (
    nisn,
    nis,
    nama,
    alamat,
    telepon,
    spp,
    kelas,
    username,
    password
  ) => {
    this.setState({
      updateNisn: nisn,
      updateNis: nis,
      updateNama: nama,
      updateAlamat: alamat,
      updateTelepon: telepon,
      updateSpp: spp,
      updateKelas: kelas,
      updateUsername: username,
      updatePassword: password,
    });
  };

  updateSiswa = (event) => {
    event.preventDefault();
    if (
      this.state.updateNisn &&
      this.state.updateNis &&
      this.state.updateNama &&
      this.state.updateAlamat &&
      this.state.updateTelepon &&
      this.state.updateSpp &&
      this.state.updateKelas &&
      this.state.updateUsername &&
      this.state.updatePassword
    ) {
      let sendData = {
        nisn: this.state.updateNisn,
        nis: this.state.updateNis,
        nama: this.state.updateNama,
        alamat: this.state.updateAlamat,
        no_telpon: this.state.updateTelepon,
        id_spp: this.state.updateSpp,
        id_kelas: this.state.updateKelas,
        username: this.state.updateUsername,
        password: this.state.updatePassword,
      };

      let url = base_url + "/siswa/update";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.updated) {
            swal("Berhasil mengubah data siswa!", {
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
                  <h4 className="text-white m-0">Data Siswa</h4>
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
                          <th scope="col">NISN</th>
                          <th scope="col">NIS</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Kelas</th>
                          <th scope="col">Alamat</th>
                          <th scope="col">No. Telpon</th>
                          <th scope="col">ID SPP</th>
                          <th scope="col">SPP</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataSiswa.map((item, i) => {
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.nisn}</td>
                              <td>{item.nis}</td>
                              <td>{item.nama}</td>
                              <td>{item.nama_kelas}</td>
                              <td>{item.alamat}</td>
                              <td>{item.no_telpon}</td>
                              <td>{item.id_spp}</td>
                              <td>Rp. {item.nominal}</td>
                              <td>
                                <button
                                  data-toggle="modal"
                                  data-target="#updateModal"
                                  className="btn btn-warning mr-2"
                                  onClick={() =>
                                    this.updateModal(
                                      item.nisn,
                                      item.nis,
                                      item.nama,
                                      item.alamat,
                                      item.no_telpon,
                                      item.id_spp,
                                      item.id_kelas,
                                      item.username,
                                      item.password
                                    )
                                  }
                                >
                                  Ubah
                                </button>
                                <button
                                  onClick={() => this.deleteSiswa(item.nisn)}
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
                <h5 className="modal-title">Tambah Data Siswa</h5>
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
                  <label htmlFor="inputNisn">NISN</label>
                  <input
                    value={this.state.nisn}
                    onChange={(ev) => this.setState({ nisn: ev.target.value })}
                    type="number"
                    className="form-control"
                    id="inputNisn"
                    placeholder="NISN"
                    min="0"
                    maxLength="10"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputNis">NIS</label>
                  <input
                    value={this.state.nis}
                    onChange={(ev) => this.setState({ nis: ev.target.value })}
                    type="number"
                    className="form-control"
                    id="inputNis"
                    placeholder="NIS"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputNama">Nama</label>
                  <input
                    value={this.state.nama}
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                    type="name"
                    className="form-control"
                    id="inputNama"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <label for="inputIdkelas">ID Kelas</label>
                  <select
                    value={this.state.id_kelas}
                    onChange={(ev) =>
                      this.setState({ id_kelas: ev.target.value })
                    }
                    className="form-control"
                    id="inputIdkelas"
                  >
                    {this.state.dataKelas.map((item, i) => {
                      return (
                        <option value={item.id_kelas}>
                          {item.id_kelas} - {item.nama_kelas}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inputAlamat">Alamat</label>
                  <input
                    value={this.state.alamat}
                    onChange={(ev) =>
                      this.setState({ alamat: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="inputAlamat"
                    placeholder="Alamat"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inputNotelepon">Nomer Telepon</label>
                  <input
                    value={this.state.no_telpon}
                    onChange={(ev) =>
                      this.setState({ no_telpon: ev.target.value })
                    }
                    type="tel"
                    className="form-control"
                    id="inputNotelepon"
                    placeholder="Nomer Telepon"
                  />
                </div>

                <div className="form-group">
                  <label for="inputIdspp">ID SPP</label>
                  <select
                    value={this.state.id_spp}
                    className="form-control"
                    id="inputIdspp"
                    onChange={(ev) =>
                      this.setState({ id_spp: ev.target.value })
                    }
                  >
                    {this.state.dataSpp.map((item, i) => {
                      return <option value={item.id_spp}>{item.id_spp} - (Rp. {item.nominal})</option>;
                    })}
                  </select>
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
                  <label htmlFor="inputPass">Password</label>
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <form onSubmit={(ev) => this.insertSiswa(ev)}>
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
                <h5 className="modal-title">Update Data Siswa</h5>
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
                  <label className="col-form-label">NIS:</label>
                  <input
                    value={this.state.updateNis}
                    onChange={(ev) =>
                      this.setState({ updateNis: ev.target.value })
                    }
                    type="number"
                    min="0"
                    className="form-control"
                  />
                </div>

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
                  <label className="col-form-label">Alamat:</label>
                  <input
                    value={this.state.updateAlamat}
                    onChange={(ev) =>
                      this.setState({ updateAlamat: ev.target.value })
                    }
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">No Telepon:</label>
                  <input
                    value={this.state.updateTelepon}
                    onChange={(ev) =>
                      this.setState({ updateTelepon: ev.target.value })
                    }
                    type="tel"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="col-form-label">ID Kelas</label>
                  <select
                    value={this.state.updateKelas}
                    onChange={(ev) =>
                      this.setState({ updateKelas: ev.target.value })
                    }
                    className="form-control"
                  >
                    {this.state.dataKelas.map((item, i) => {
                      return (
                        <option value={item.id_kelas}>
                          {item.id_kelas} - {item.nama_kelas}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label className="col-form-label">ID SPP</label>
                  <select
                    value={this.state.updateSpp}
                    className="form-control"
                    onChange={(ev) =>
                      this.setState({ updateSpp: ev.target.value })
                    }
                  >
                    {this.state.dataSpp.map((item, i) => {
                      return <option value={item.id_spp}>{item.id_spp} - (Rp. {item.nominal})</option>;
                    })}
                  </select>
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <form onSubmit={(ev) => this.updateSiswa(ev)}>
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
