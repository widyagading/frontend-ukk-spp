import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { base_url } from "../config.js";
import Loader from "react-loader-spinner";

export default class History extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoaded: false,
      dataBayar: [],
      role: "",
    };
  }

  componentDidMount() {
    let role = JSON.parse(localStorage.getItem("userData")).level;
    if (!role) {
      this.setState({
        role: "siswa",
        nisn: JSON.parse(localStorage.getItem("userData")).nisn,
      });
    } else {
      this.setState({
        role: role,
      });
    }

    this.dataHistory();
  }

  dataHistory = () => {
    this.setState({
      isLoaded: false,
    });

    let url = base_url + "/pembayaran";
    axios
      .get(url)
      .then((response) => {
        if (response) {
          if (this.state.role == "siswa") {
            this.setState({
              isLoaded: true,
              dataBayar: response.data.data.filter(
                (item) => item.nisn === this.state.nisn
              ),
            });
          } else {
            this.setState({
              isLoaded: true,
              dataBayar: response.data.data,
            });
          }
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <Navbar />

        <div className="container mt-4">
          <div className="row mt-4">
            <div className="col">
              <div className="card mb-4">
                <h4 className="card-header text-white bg-danger">
                  Riwayat Pembayaran SPP
                </h4>
                <div className="card-body">
                  {!this.state.isLoaded ? (
                    <div className="d-flex justify-content-center">
                      <Loader
                        type="Bars"
                        color="orange"
                        height={75}
                        width={74}
                        // timeout={3000} //3 secs
                      />
                    </div>
                  ) : this.state.dataBayar.length < 1 ? (
                    <h2 align="center">Belum ada history pembayaran</h2>
                  ) : (
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">ID Pembayaran</th>
                          <th scope="col">Petugas</th>
                          <th scope="col">Nama Siswa</th>
                          <th scope="col">Tanggal</th>
                          <th scope="col">Bulan</th>
                          <th scope="col">Tahun</th>
                          <th scope="col">ID SPP</th>
                          <th scope="col">Nominal SPP</th>
                          <th scope="col">Total Bayar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.dataBayar.map((item, i) => {
                          let date = new Date(item.tgl_bayar);
                          let formatted =
                            date.getDate() +
                            "/" +
                            (date.getMonth() + 1) +
                            "/" +
                            date.getFullYear();
                          return (
                            <tr>
                              <th scope="row">{i + 1}</th>
                              <td>{item.id_pembayaran}</td>
                              <td>{item.nama_petugas}</td>
                              <td>{item.nama}</td>
                              <td>{formatted}</td>
                              <td>{item.bulan_dibayar}</td>
                              <td>{item.tahun_dibayar}</td>
                              <td>{item.id_spp}</td>
                              <td>{item.nominal}</td>
                              <td className="text-success">
                                {item.jumlah_bayar}
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
      </div>
    );
  }
}
