import { useState } from "react";
function Licznik(){
    const [licz, setLicz] = useState(0);
    return (
        <div className="flex flex-col gap-2">
            <div>
                {licz}
            </div>
            <button onClick={() => setLicz(licz + 1)}>Dodaj</button>
        </div>
    );
}

export default Licznik;