import React from "react";
import Navbar from "../components/Navbar";
import swal from "sweetalert";

export default class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      username: "",
      role: "",
    };
  }

  componentDidMount() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.setState({
      username: userData.username,
      role: userData.level,
    });
  }

  Logout = () => {
    swal({
      title: "Apakah anda yakin ??",
      text: "anda akan logout dari akun ini",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then((logout) => {
      if (logout) {
        localStorage.removeItem("userData");
        localStorage.removeItem("auth");
        swal("Anda berhasil Logout!", {
          icon: "success",
        }).then(() => {
          window.location = "/login";
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <h4 className="card-header text-white bg-danger">Home</h4>

                <div className="card-body">
                  <h2 align="center">
                    Hi! {this.state.username} Nice to meet you
                  </h2>
                  {this.state.role ? (
                    <p
                      align="center"
                      style={{ fontWeight: "bold", color: "green" }}
                    >
                      your role: {this.state.role}
                    </p>
                  ) : (
                    
                    <p
                      align="center"
                      style={{ fontWeight: "bold", color: "green" }}
                    >
                      Nama: {JSON.parse(localStorage.getItem("userData")).nama}<br/>
                      NISN: {JSON.parse(localStorage.getItem("userData")).nisn}<br/>
                      NIS: {JSON.parse(localStorage.getItem("userData")).nis}<br/>
                      Kelas: {JSON.parse(localStorage.getItem("userData")).nama_kelas}<br/>
                      SPP: {JSON.parse(localStorage.getItem("userData")).spp}<br/>
                    </p>
                  )}

                  <button
                    onClick={this.Logout}
                    className="btn btn-warning mx-auto d-block mt-4"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
