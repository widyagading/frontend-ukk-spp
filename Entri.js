import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import swal from "sweetalert";

export default class entri extends React.Component {
  constructor() {
    super();

    this.state = {
      id_petugas: null,
      nama: "",
      dataSiswa: [],
      nisn: null,
      tgl_bayar: "",
      id_spp: "",
      bayar: "",
      jumlah_bayar: null,
      nominal: null,
      kelas: "",
    };
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("userData")).level) {
      this.props.history.push("/404");
    }

    let userData = JSON.parse(localStorage.getItem("userData"));
    this.setState({
      id_petugas: userData.id_petugas,
    });
  }

  Entri = (event) => {
    event.preventDefault();
    if (
      this.state.nisn &&
      this.state.tgl_bayar &&
      this.state.jumlah_bayar &&
      this.state.id_spp
    ) {
      let inputDate = new Date(this.state.tgl_bayar);
      let inputMonth = inputDate.getMonth() + 1;
      let inputYear = inputDate.getFullYear();

      let sendData = {
        id_petugas: this.state.id_petugas,
        nisn: this.state.nisn,
        tgl_bayar: this.state.tgl_bayar,
        bulan_dibayar: inputMonth,
        tahun_dibayar: inputYear,
        id_spp: this.state.id_spp,
        jumlah_bayar: this.state.jumlah_bayar,
      };

      let url = base_url + "/pembayaran/entri";

      axios
        .post(url, sendData)
        .then((response) => {
          if (response.data.inserted) {
            swal("Berhasil melakukan entri pembayaran!", {
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            alert("Failed insert data!");
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

  search = () => {
    if (this.state.nama) {
      let url = base_url + "/siswa/" + this.state.nama;

      axios
        .get(url)
        .then((response) => {
          if (response) {
            if (response.data.count < 1) {
              alert("SISWA TIDAK DITEMUKAN");
              this.setState(
                {
                  dataSiswa: [],
                },
                function () {
                  this.reset();
                }
              );
            } else {
              this.setState(
                {
                  dataSiswa: response.data.data[0],
                },
                function () {
                  this.fillInput();
                }
              );
            }
          }
        })
        .catch((error) => console.log(error));
    }
  };

  reset = () => {
    this.setState({
      nisn: "",
      nominal: "",
      kelas: "",
      bayar: "",
      jumlah_bayar: "",
    });
  };

  fillInput = () => {
    this.setState({
      jumlah_bayar: this.state.bayar * this.state.dataSiswa.nominal,
      nisn: this.state.dataSiswa.nisn,
      id_spp: this.state.dataSiswa.id_spp,
      nominal: this.state.dataSiswa.nominal,
      kelas: this.state.dataSiswa.nama_kelas,
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4">
                <h4 className="card-header text-white bg-danger">
                  Entri Pembayaran
                </h4>
                <div className="card-body">
                  <form onSubmit={(ev) => this.Entri(ev)}>
                    <div className="form-group">
                      <label htmlFor="inputName">Nama Siswa</label>
                      <div className="form-inline">
                        <input
                          value={this.state.nama}
                          onChange={(ev) =>
                            this.setState({ nama: ev.target.value })
                          }
                          type="name"
                          className="form-control d-flex flex-grow-1"
                          id="inputName"
                          placeholder="Enter Name"
                        />
                        <button
                          type="button"
                          onClick={() => this.search()}
                          className="btn btn-success ml-2"
                        >
                          Cari
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputNisn">NISN</label>
                      <input
                        disabled
                        value={this.state.nisn}
                        onChange={(ev) =>
                          this.setState({ nisn: ev.target.value })
                        }
                        type="number"
                        className="form-control"
                        id="inputNisn"
                        placeholder="Enter NISN"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputSpp">Nominal SPP</label>
                      <input
                        disabled
                        value={this.state.nominal}
                        type="text"
                        className="form-control"
                        id="inputSpp"
                        placeholder="SPP"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputSpp">Kelas</label>
                      <input
                        disabled
                        value={this.state.kelas}
                        type="text"
                        className="form-control"
                        id="inputKelas"
                        placeholder="Kelas"
                      />
                    </div>

                    <div className="form-group">
                      <label>Pembayaran</label>
                      <div className="form-inline">
                        <input
                          value={this.state.bayar}
                          onChange={(ev) =>
                            this.setState({
                              bayar: ev.target.value,
                              jumlah_bayar:
                                this.state.nominal * ev.target.value,
                            })
                          }
                          type="number"
                          className="form-control d-flex flex-grow-1"
                          id="inputJumlah"
                          placeholder="Berapa Kali Bayar"
                          min="1"
                        />

                        <input
                          disabled
                          value={this.state.jumlah_bayar}
                          type="number"
                          className="form-control ml-2 d-flex flex-grow-1"
                          id="inputJumlah"
                          placeholder="Total Bayar"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputTanggal">Tanggal Bayar</label>
                      <input
                        value={this.state.tgl_bayar}
                        onChange={(ev) =>
                          this.setState({ tgl_bayar: ev.target.value })
                        }
                        type="date"
                        className="form-control"
                        id="inputTanggal"
                        placeholder="Tanggal"
                      />
                    </div>

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
        </div>
      </div>
    );
  }
}
