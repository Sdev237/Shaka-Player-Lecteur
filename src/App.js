import React from "react";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navigation />
      <HomePage />
    </div>
  );
}

export default App;
