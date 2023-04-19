import React, { useContext } from "react";
import { DataBaseContext } from "./providers/DataBaseProvider";
import { PropertyIdProvider } from "./providers/PropertyIdProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactSession } from "react-client-session";
import "./App.scss";
import AddPrice from "./components/create/AddPrice";
import AddProperty from "./components/create/AddProperty";
import AdminPending from "./components/admin/AdminPending";
import Login from "./components/session/Login";
import Map from "./components/map/Map";
import Header from "./components/navbar/Header";
import PropertyList from "./components/create/CreatePropertyList";
import Register from "./components/session/Register";
import RentList from "./components/RentList";
import LoadingSpinner from "./components/LoadingSpinner";
import Dashboard from "./components/admin/Dashboard";

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
        <div className="Content">
          <Switch>
              
            <Route exact path="/">
              <Map />
              <div className="home-right">
                <RentList />
              </div>
            </Route>
              
            <Route exact path="/admin/dashboard">
              <Dashboard />
            </Route>
              
            <Route exact path="/admin/pending">
              <div className="admin-background">
                <AdminPending />
              </div>
            </Route>
              
            <Route exact path="/create/update">
              <div className="create-background" >
              <div className="create-body">
                <div className="create-forms">
                  <AddPrice />
                </div>
                </div>
              </div>  
            </Route>
              
            <Route exact path="/create/property">
              <div className="create-background">
                <div className="add-property-body">
                  <div className="all-properties">
                    <PropertyList />
                  </div>
                  <div className="add-property">
                    <AddProperty />
                  </div>
                </div>
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
