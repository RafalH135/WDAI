interface Student {
  imię: string;
  nazwisko: string;
  rocznik: number;
}

function Studenci() {
  const students: Student[] = [
    { imię: "Siemowit", nazwisko: "Potężny", rocznik: 2005 },
    { imię: "Kazimierz", nazwisko: "Wielki", rocznik: 2000 },
    { imię: "Władysław", nazwisko: "Pogromca", rocznik: 2004 },
    { imię: "Bożydar", nazwisko: "Grzmot", rocznik: 2006 },
    { imię: "Jerzy", nazwisko: "Hak", rocznik: 2005 },
    { imię: "Sławomir", nazwisko: "Władca", rocznik: 2005 },
  ];
  return (
    <div>
      <table>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
        {students.map((student: Student, index: number) => (
          <tr key={index}>
            <td>{student.imię}</td>
            <td>{student.nazwisko}</td>
            <td>{student.rocznik}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Studenci;
