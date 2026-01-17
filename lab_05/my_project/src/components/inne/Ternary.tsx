function Ternary() {
  const a = true;
  const b = false;

  return (
    <div className="flex flex-col gap-10px">
      <div>
        Stwierdzenie a jest {a ? "prawdziwe" : "fałszywe"}
      </div>
      <div>
        Stwierdzenie b jest {b ? "prawdziwe" : "fałszywe"}
      </div>
    </div>
  );
}

export default Ternary;
