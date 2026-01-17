import { useEffect, useState } from "react";

function Tytul() {
  const [tytul, setTytul] = useState("Nowa strona");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTytul(e.target.value);
  };
  useEffect(() => {
    document.title = tytul;
  }, [tytul]);
  return (
    <div>
      <input value={tytul} onChange={handleChange} />
    </div>
  );
}
export default Tytul;
