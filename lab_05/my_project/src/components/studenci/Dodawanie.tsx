import { useState } from "react"
interface Student {
  imię: string;
  nazwisko: string;
  rocznik: number;
}
type DodawanieProps = {
    f: (student : Student) => void
}
function Dodawanie({ f } : DodawanieProps) {
    const [imie, setImie] = useState<string>("")
    const [nazwisko, setNazwisko] = useState<string>("")
    const [rocznik, setRocznik] = useState<number>(0)

    const imieHandler = (e : React.ChangeEvent<HTMLInputElement>) => setImie(e.target.value);
    const nazwiskoHandler = (e : React.ChangeEvent<HTMLInputElement>) => setNazwisko(e.target.value);
    const rocznikHandler = (e : React.ChangeEvent<HTMLInputElement>) => setRocznik(Number(e.target.value));
    const walidacja = () => {
        if(imie!=="" && nazwisko!=="" && rocznik>=1900 && rocznik <= new Date().getFullYear()){
            f({imię:imie, nazwisko: nazwisko, rocznik : rocznik})
        }
    }

    return (
        <div>
            <h2>Dodaj studenta</h2>
            <h2>Imię</h2>
            <input type="text"
            value={imie}
            placeholder="Podaj nazwisko studenta"
            onChange={imieHandler}
            />
            <h2>Nazwisko</h2>
            <input type="text" 
            value={nazwisko}
            placeholder="Podaj nazwisko studenta"
            onChange={nazwiskoHandler}
            />
            <h2>Rocznik</h2>
            <input 
            type="number"
            value={rocznik}
            placeholder="Podaj rocznik studenta"
            onChange={rocznikHandler}
            />
            <br/>
            <button onClick={walidacja}>Dodaj</button>
        </div>
    )
}
export default Dodawanie