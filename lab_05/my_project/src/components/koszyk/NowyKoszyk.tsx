function NowyKoszyk(){
    const Produkty : string[] = ["Jabłko","Banan","Piłka","Kapusta","Koszulka"];
    return (
        <div className="flex flex-col gap-2">
            {Produkty.map((produkt, index) => (
                <div key={index}>
                    {produkt}
                </div>
            ))}
        </div>
    );
}

export default NowyKoszyk;