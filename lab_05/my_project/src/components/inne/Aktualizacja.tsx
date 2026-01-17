import { useState } from "react";

function Aktualizacja() {
    const [stan, setStan] = useState({nazwa: "Pomidor", cena: 50})

    type stanType = {
        nazwa : string,
        cena : number
    }
    const updateCena = (prevStan : stanType) => {
        setStan({
            ...prevStan, cena: 100
        })
    }

    return (
        <div>
            <div>
                Aktualnie {stan.nazwa} kosztuje {stan.cena}
            </div>
            <button onClick={() => updateCena(stan)}>Zmień cenę</button>
        </div>
    )
}

export default Aktualizacja;
