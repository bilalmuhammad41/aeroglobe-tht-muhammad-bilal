import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ComboDealWrapper } from "./components/ComboDealWrapper";
import React from "react";

function App() {
  return (
    <Provider store={store}>
      {React.createElement(ComboDealWrapper)}
    </Provider>
  );
}

export default App;
