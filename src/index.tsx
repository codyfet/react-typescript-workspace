import React from "react";
import ReactDOM from "react-dom";

const x: number = "1";

const App = () => <h1>My React and TypeScript App!</h1>;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
