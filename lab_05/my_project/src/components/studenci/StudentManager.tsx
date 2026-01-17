import { useState } from "react";
import Dodawanie from "./Dodawanie";

interface Student {
  imię: string;
  nazwisko: string;
  rocznik: number;
}

function StudentManager() {
  const [students, studentsSet] = useState<Student[]>([
    { imię: "Siemowit", nazwisko: "Potężny", rocznik: 2005 },
    { imię: "Kazimierz", nazwisko: "Wielki", rocznik: 2000 },
    { imię: "Władysław", nazwisko: "Pogromca", rocznik: 2004 },
    { imię: "Bożydar", nazwisko: "Grzmot", rocznik: 2006 },
    { imię: "Jerzy", nazwisko: "Hak", rocznik: 2005 },
    { imię: "Sławomir", nazwisko: "Władca", rocznik: 2005 },
  ]);

  const newStudentHandler = (student: Student) => {
    studentsSet([...students, student]);
  };
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
      <Dodawanie f={newStudentHandler} />
    </div>
  );
}

export default StudentManager;
