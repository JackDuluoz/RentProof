import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactSession } from "react-client-session";
import { DataBaseContext } from "./providers/DataBaseProvider";
import { PropertyIdProvider } from "./providers/PropertyIdProvider";
import AddPrice from "./pages/Create/Update/AddPrice";
import AddProperty from "./pages/Create/Find/AddProperty";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Header from "./components/header/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import Login from "./pages/Login/Login";
import Map from "./pages/Home/map/Map";
import Pending from "./pages/Admin/Pending/Pending";
import PropertyList from "./pages/Create/Find/FindProperty";
import Register from "./pages/Register/Register";
import Rentals from "./pages/Home/rentals/Rentals";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "./App.scss";

function App() {
  ReactSession.setStoreType("sessionStorage");
  const { isLoading } = useContext(DataBaseContext);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Router>
      <PropertyIdProvider>
        <div className="App">
          <div>
            <Header />
          </div>
        <div className="content">
          <Switch>              
            <Route exact path="/">
              <Map />
              <Rentals />
            </Route>
              
            <Route exact path="/admin/dashboard">
              <Dashboard />
            </Route>
              
            <Route exact path="/admin/pending">
              <Pending />
            </Route>
              
            <Route exact path="/create/update">
              <div className="update" >
                <AddPrice />
              </div>  
            </Route>
              
            <Route exact path="/create/property">
              <div className="find">
                <PropertyList />
                <AddProperty />
              </div>              
            </Route>
              
            <Route exact path="/register">
              <div className="register-background">
                <Register />
              </div>
              </Route>

              <Route exact path="/login">
                <div className="login-background">
                  <Login />
                </div>
              </Route>
            </Switch>
          </div>
        </div>
      </PropertyIdProvider>
    </Router>
  );
}

export default App;
