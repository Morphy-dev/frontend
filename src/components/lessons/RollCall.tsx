import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeftIcon,
  // Additional icons if needed
} from "../../icons";

// Example data model for each student
interface Student {
  id: number;
  name: string;
  present: boolean;
}

const initialStudents: Student[] = [
  { id: 1, name: "Sofia", present: true },
  { id: 2, name: "Mateo", present: false },
  { id: 3, name: "Luis", present: true },
  { id: 4, name: "Andrea", present: false },
  { id: 5, name: "Maria", present: false },
  // Add or duplicate as needed to match your screenshot
];

export default function RollCallPage() {
  const [step, setStep] = useState(1);
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // Toggle a student's presence status
  const togglePresence = (id: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  // Move to next step
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // If needed, do some final action when step = 3
      alert("¡Lección iniciada!");
    }
  };

  // Count how many are present / absent
  const totalStudents = students.length;
  const presentCount = students.filter((s) => s.present).length;
  const absentCount = totalStudents - presentCount;

  return (
    <div className="p-6 space-y-6">
      {/* Header: Back button + Menu placeholder */}
      <div className="flex items-center justify-between">
        {/* Back button */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-700 dark:text-white"
        >
          <ChevronLeftIcon className="size-6" />
          <span className="font-semibold">Regresar</span>
        </Link>

        {/* Optional top-right menu placeholder */}
        <div className="text-gray-700 dark:text-white">Menu</div>
      </div>

      {/* Lesson Info */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
          Grupo 1 &nbsp; Semana 1 - Lección 1
        </h2>
      </div>

      {/* Step Progress Bar */}
      <div className="flex items-center justify-center gap-8 mt-4">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? "border-brand-500" : "border-gray-300"
            }`}
          >
            <span
              className={`font-semibold ${
                step >= 1 ? "text-brand-500" : "text-gray-400"
              }`}
            >
              1
            </span>
          </div>
          <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Chequeo de recursos
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? "border-green-500" : "border-gray-300"
            }`}
          >
            <span
              className={`font-semibold ${
                step >= 2 ? "text-green-500" : "text-gray-400"
              }`}
            >
              2
            </span>
          </div>
          <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Llamado a lista
          </span>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step === 3 ? "border-gray-500" : "border-gray-300"
            }`}
          >
            <span
              className={`font-semibold ${
                step === 3 ? "text-gray-600" : "text-gray-400"
              }`}
            >
              3
            </span>
          </div>
          <span className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Inicio de lección
          </span>
        </div>
      </div>

      {/* Student Stats */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 w-fit">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {totalStudents} estudiantes
        </h3>
        <div className="flex flex-col mt-2 text-sm text-gray-600 dark:text-gray-300">
          <span>
            <span className="inline-block w-3 h-3 mr-1 rounded-full bg-green-500"></span>
            <b>{presentCount}</b> estudiantes presentes
          </span>
          <span>
            <span className="inline-block w-3 h-3 mr-1 rounded-full bg-gray-400"></span>
            <b>{absentCount}</b> estudiantes no presentes
          </span>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-5 gap-6 sm:grid-cols-5">
        {students.map((student) => (
          <button
            key={student.id}
            onClick={() => togglePresence(student.id)}
            className={`flex flex-col items-center justify-center p-3 transition rounded-xl border-2 shadow-sm
              ${
                student.present
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-100"
              }`}
          >
            {/* Student Avatar Icon */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                student.present ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              {/* Replace 🔥 with your custom avatar/image */}
              🔥
            </div>
            {/* Name */}
            <span className="mt-2 text-sm font-medium text-gray-700 dark:text-white">
              {student.name}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Navigation Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="inline-flex items-center px-6 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
