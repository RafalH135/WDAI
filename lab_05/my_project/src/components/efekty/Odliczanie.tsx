import { useEffect, useState } from "react";

function Odliczanie() {
  const [licznik, setLicznik] = useState(15);
  const [napis, setNapis] = useState("START");

  const canPress = licznik > 0;
  const handleClick = () => {
    if (napis === "START") {
      setNapis("STOP");
    } else {
      setNapis("START");
    }
  };
  useEffect(() => {
    if (napis !== "STOP") return;

    const interval = setInterval(() => {
      setLicznik((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setNapis("START");
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [napis]);

  return (
    <div>
      <div>{licznik.toFixed(1)}</div>
      <button disabled={!canPress} onClick={handleClick}>
        {napis}
      </button>
    </div>
  );
}
export default Odliczanie;
