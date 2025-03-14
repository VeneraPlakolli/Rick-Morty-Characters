import Header from "./components/Header";
import Characters from "./components/Characters";
import Filters from "./components/Filters";
import { CharactersContextProvider } from "./store/CharactersContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CharactersContextProvider>
        <Header />
        <Filters />
        <Characters />
      </CharactersContextProvider>
    </div>
  );
}

export default App;
