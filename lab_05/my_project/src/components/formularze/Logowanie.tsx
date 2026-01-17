import { useState } from "react";

function Logowanie() {
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");
  const [nazwa, setNazwa] = useState("");

  const isDisabled = haslo === "" || powtorzHaslo === "" || nazwa === "";

  function walidacja() {
    if (haslo === powtorzHaslo) {
      alert("Zalogowano poprawnie");
    } else {
      alert("Hasła nie są zgodne");
    }
  }

  const hasloHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHaslo(e.target.value);
  const powtorzHasloHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPowtorzHaslo(e.target.value);
  const nazwaHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNazwa(e.target.value);

  return (
    <div className="flex flex-col gap-2">
      <h2>Nazwa użytkownika</h2>
      <input
        type="text"
        value={nazwa}
        onChange={nazwaHandler}
        placeholder="Podaj nazwę użytkownika"
      />
      <h2>Hasło</h2>
      <input
        type="text"
        value={haslo}
        onChange={hasloHandler}
        placeholder="Wpisz hasło"
      />
      <h2>Powtórz Hasło</h2>
      <input
        type="text"
        value={powtorzHaslo}
        onChange={powtorzHasloHandler}
        placeholder="Powtórz hasło"
      />
      <br/>
      <button disabled={isDisabled} onClick={walidacja}>
        Logowanie
      </button>
    </div>
  );
}

export default Logowanie;
