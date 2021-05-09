import React from "react";
import "./app.css";
import Cards from "./Components/Cards/cards";
import List from "./Components/List/list";

function App() {
  return (
    <div className="main">
      <Cards />
      <List />
    </div>
  );
}

export default App;
