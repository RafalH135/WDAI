import { useState } from "react";

function Haslo() {
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  let message: string = "Proszę wprowadzić hasło";

  if (haslo !== "" || powtorzHaslo !== "") {
    if (haslo !== powtorzHaslo) {
      message = "Hasła nie są zgodne";
    } else {
      message = "";
    }
  }

  const hasloHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHaslo(e.target.value);
  const powtorzHasloHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPowtorzHaslo(e.target.value);

  return (
    <div>
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
      <div>{message}</div>
    </div>
  );
}

export default Haslo;
