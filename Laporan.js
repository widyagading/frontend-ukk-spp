import React from "react";
import Navbar from "../components/Navbar";

export default class laporan extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    if (!JSON.parse(localStorage.getItem("userData")).level) {
      this.props.history.push("/404");
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <h2>Laporan Pembayaran SPP</h2>

          <div className="row mt-4">
            <div className="col">
              <div className="card mb-4">
                <h4 className="card-header text-white bg-danger">SPP</h4>
                <div className="card-body">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Nama Siswa</th>
                        <th scope="col">NISN</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>109930229</td>
                        <td>12 Agusus 2020</td>
                        <td className="text-success">
                          <b>Rp. 200000</b>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>109930229</td>
                        <td>12 Agusus 2020</td>
                        <td className="text-success">
                          <b>Rp. 200000</b>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>109930229</td>
                        <td>12 Agusus 2020</td>
                        <td className="text-success">
                          <b>Rp. 200000</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
