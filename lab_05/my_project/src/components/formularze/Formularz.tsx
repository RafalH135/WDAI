import { useState } from "react";

function Formularz() {
  const [tekst, setTekst] = useState("");

  const updateTekst = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTekst(e.target.value);
  return (
    <div>
      <div>{tekst}</div>
      <input
        type="text"
        value={tekst}
        onChange={updateTekst}
        placeholder="Wpisz coś"
      />
    </div>
  );
}

export default Formularz;
