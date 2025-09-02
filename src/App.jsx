import { useState } from "react";
import "./App.css";
import Search from "./components/search";

function App() {
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="hero-banner" />
          <h1 className="text-3xl font-bold underline">Hello</h1>;
        </header>
        <Search />
      </div>
    </main>
  );
}

export default App;
