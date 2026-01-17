type PrzyciskProps = {
  f: () => void;
};
function Przycisk({ f }: PrzyciskProps) {
  return <button onClick={() => f()}>Dodaj</button>;
}

export default Przycisk;
