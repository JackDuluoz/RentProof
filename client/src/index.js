import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DataBaseProvider } from "./providers/DataBaseProvider";
import { MarkerFilterProvider } from "./providers/MarkerFilterProvider";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <DataBaseProvider>
      <MarkerFilterProvider>
        <App />
      </MarkerFilterProvider>
    </DataBaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
