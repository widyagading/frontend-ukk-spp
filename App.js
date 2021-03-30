import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import Data_Kelas from "./pages/Data_Kelas";
import Data_Petugas from "./pages/Data_Petugas";
import Data_Siswa from "./pages/Data_Siswa";
import Data_Spp from "./pages/Data_Spp";
import Entri from "./pages/Entri";
import Laporan from "./pages/Laporan";
import LoginSiswa from "./pages/LoginSiswa";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      role: "",
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("auth")) {
      this.setState({
        loggedIn: true,
        role: JSON.parse(localStorage.getItem("userData")).level
          ? JSON.parse(localStorage.getItem("userData")).level
          : "siswa",
      });
    }
  };

  render() {
    const componentNotFound = () => {
      return (
        <div className="d-flex vh-100">
          <h1 className="mx-auto my-auto">SPP Siswa | 404 Not Found</h1>
        </div>
      );
    };

    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={this.state.loggedIn}
          component={Home}
        />
        <Route path="/login" component={Login} />
        <Route path="/login-siswa" component={LoginSiswa} />
        <ProtectedRoute
          path="/history"
          loggedIn={this.state.loggedIn}
          component={History}
        />
        <ProtectedRoute
          path="/data-kelas"
          loggedIn={this.state.loggedIn}
          component={Data_Kelas}
        />
        <ProtectedRoute
          path="/data-petugas"
          loggedIn={this.state.loggedIn}
          component={Data_Petugas}
        />
        <ProtectedRoute
          path="/data-siswa"
          loggedIn={this.state.loggedIn}
          component={Data_Siswa}
        />
        <ProtectedRoute
          path="/data-spp"
          loggedIn={this.state.loggedIn}
          component={Data_Spp}
        />
        <ProtectedRoute
          path="/entri"
          loggedIn={this.state.loggedIn}
          component={Entri}
        />
        <ProtectedRoute
          path="/laporan"
          loggedIn={this.state.loggedIn}
          component={Laporan}
        />
        <Route path="/404" component={componentNotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
