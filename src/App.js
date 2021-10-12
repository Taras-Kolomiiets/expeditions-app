import * as React from "react";
import "./App.css";
import Header from "./components/header/Header";
import SelectForm from "./components/select/Select";
import PhotosList from "./components/photosList/PhotosList";

const App = () => {
  return (
    <div className="App">
      <Header />
      <SelectForm />
      <PhotosList />
    </div>
  );
};

export default App;
