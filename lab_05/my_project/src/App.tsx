import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import StudentManager from "./components/studenci/StudentManager";
import EffectLicznik from "./components/efekty/EffectLicznik";
import Koszyk from "./components/koszyk/Koszyk";
import Product from "./components/koszyk/Product";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import Licznik from "./components/liczniki/Licznik";
import Przycisk from "./components/liczniki/Przycisk";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import Formularz from "./components/formularze/Formularz";
import Haslo from "./components/formularze/Haslo";
import Logowanie from "./components/formularze/Logowanie";
import Ternary from "./components/inne/Ternary";
import Aktualizacja from "./components/inne/Aktualizacja";
import Studenci from "./components/studenci/Studenci";
import Tytul from "./components/efekty/Tytul";
import Odliczanie from "./components/efekty/Odliczanie";
import Komentarze from "./components/produkty/Komentarze";
function App() {
  const [licz, setLicz] = useState(0);

  return (
    <>
      {
        /* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */
        // <Koszyk>
        //   <Product nazwa="Jabłko"/>
        //   <Product nazwa="Banan"/>
        //   <Product nazwa="Piłka"/>
        //   <Product nazwa="Kapusta"/>
        //   <Product nazwa="Koszulka"/>
        // </Koszyk>
        <>
          <div>
            <h1>Zad 1.1</h1>
            <Koszyk>
              <Product nazwa="jabłko" />
              <Product nazwa="gruszka" />
              <Product nazwa="pietruszka" />
              <Product nazwa="jarmuż" />
              <Product nazwa="frytki" />
            </Koszyk>
          </div>
          <div>
            <h1>Zad 1.2</h1>
            <NowyKoszyk />
          </div>
          <div>
            <h1>Zad 2.1</h1>
            <Licznik />
          </div>
          <div>
            <h1>Zad 2.2</h1>
            <NowyLicznik licz={licz} />
            <Przycisk f={() => setLicz(licz + 1)} />
          </div>
          <div>
            <h1>Zad 3.1</h1>
            <Formularz />
          </div>
          <div>
            <h1>Zad 3.2</h1>
            <Haslo />
          </div>
          <div>
            <h1>Zad 3.3</h1>
            <Logowanie />
          </div>
          <div>
            <h1>Zad 4.1</h1>
            <Ternary />
          </div>
          <div>
            <h1>Zad 4.2</h1>
            <Aktualizacja />
          </div>
          <div>
            <h1>Zad 5.1</h1>
            <Studenci />
          </div>
          <div>
            <h1>Zad 5.2</h1>
            <StudentManager />
          </div>

          <div>
            <h1>Zad 6.1</h1>
            <EffectLicznik />
          </div>
          <div>
            <h1>Zad 6.2</h1>
            <Tytul/>
          </div>
          <div>
            <h1>Zad 6.3</h1>
            <Odliczanie/>
          </div>
          <div>
            <h1>Zad 7.2</h1>
            <Komentarze/>
          </div>
        </>
      }
    </>
  );
}

export default App;
