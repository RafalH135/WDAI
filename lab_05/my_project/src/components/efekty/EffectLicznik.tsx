import { useState, useEffect } from "react";

function EffectLicznik() {
  const [licz, setLicz] = useState(0);

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log(`Licznik zwiększył się do ${licz}`);
  }, [licz]);

  return (
    <div className="flex flex-col gap-2">
      <div>{licz}</div>
      <button onClick={() => setLicz(licz + 1)}>Dodaj</button>
    </div>
  );
}

export default EffectLicznik;
