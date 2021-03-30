import React from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-danger">
        <a className="navbar-brand" href="/">
          SPP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {!localStorage.getItem("userData") ? (
              <></>
            ) : JSON.parse(localStorage.getItem("userData")).level ==
              "admin" ? (
              <>
                <Link className="nav-item nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-item nav-link" to="/history">
                  History
                </Link>
                <Link className="nav-item nav-link" to="/laporan">
                  Laporan
                </Link>
                <Link className="nav-item nav-link" to="/entri">
                  Entri
                </Link>
                <Link className="nav-item nav-link" to="/data-siswa">
                  Data Siswa
                </Link>
                <Link className="nav-item nav-link" to="/data-kelas">
                  Data Kelas
                </Link>
                <Link className="nav-item nav-link" to="/data-petugas">
                  Data Petugas
                </Link>
                <Link className="nav-item nav-link" to="/data-spp">
                  Data Spp
                </Link>
              </>
            ) : JSON.parse(localStorage.getItem("userData")).level ==
              "petugas" ? (
              <>
                <Link className="nav-item nav-link active" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
                <Link className="nav-item nav-link" to="/history">
                  History
                </Link>
                <Link className="nav-item nav-link" to="/entri">
                  Entri
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link className="nav-item nav-link active" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
                <Link className="nav-item nav-link" to="/history">
                  History
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}
<li className="nav-item">
                              
  <Link to="/" className="nav-link">
    Product
  </Link>
                          
</li>;
