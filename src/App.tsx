import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { ComboDealWrapper } from "./components/ComboDealWrapper";

function App() {
  return (
    <Provider store={store}>
      <ComboDealWrapper/>
    </Provider>
  );
}

export default App;
