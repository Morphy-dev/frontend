import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "./Label";
import Input from "./InputField";
import Select from "./Select";

interface Student {
  id: number;
  name: string;
  age: string;
  evaluated: boolean;
  picture: File | null;
}

export default function CreateGroupPage() {
  const [groupName, setGroupName] = useState("");
  const [students, setStudents] = useState<Student[]>([
    // Start with one empty student form
    { id: Date.now(), name: "", age: "", evaluated: false, picture: null },
  ]);

  const handleAddStudent = () => {
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        age: "",
        evaluated: false,
        picture: null,
      },
    ]);
  };

  const handleStudentChange = (
    index: number,
    field: keyof Student,
    value: string | boolean | File | null
  ) => {
    setStudents((prev) =>
      prev.map((student, i) =>
        i === index
          ? {
              ...student,
              [field]: value,
            }
          : student
      )
    );
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: Submit data or save to your backend
    console.log("Group Name:", groupName);
    console.log("Students:", students);
    alert("Group created!");
    // Reset if desired
    // setGroupName("");
    // setStudents([{ id: Date.now(), name: "", age: "", evaluated: false, picture: null }]);
  };

  return (
    <form onSubmit={handleCreateGroup}>
      <ComponentCard title="Create a New Group">
        <div className="space-y-6">
          {/* Group Name */}
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              type="text"
              id="groupName"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {/* Student Forms */}
          <div className="flex flex-col gap-4">
            <h4 className="text-md font-medium text-gray-800 dark:text-white/90">
              Students
            </h4>
            {students.map((student, index) => (
              <div
                key={student.id}
                className="rounded-lg bg-gray-50 p-4 dark:bg-white/5"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Student Name */}
                  <div>
                    <Label>Student Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={student.name}
                      onChange={(e) =>
                        handleStudentChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <Label>Age</Label>
                    <Input
                      type="number"
                      placeholder="e.g. 10"
                      value={student.age}
                      onChange={(e) =>
                        handleStudentChange(index, "age", e.target.value)
                      }
                    />
                  </div>

                  {/* Evaluated Checkbox */}
                  <div className="flex items-center pt-6">
                    <input
                      type="checkbox"
                      id={`evaluated-${student.id}`}
                      checked={student.evaluated}
                      onChange={(e) =>
                        handleStudentChange(
                          index,
                          "evaluated",
                          e.target.checked
                        )
                      }
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-600 dark:border-gray-600 dark:bg-gray-900 dark:focus:ring-brand-400"
                    />
                    <Label
                      className="text-gray-800 dark:text-gray-300"
                      htmlFor={`evaluated-${student.id}`}
                    >
                      Has been evaluated?
                    </Label>
                  </div>
                </div>

                {/* Picture Upload */}
                <div className="mt-4">
                  <Label htmlFor={`picture-${student.id}`}>Picture</Label>
                  <Input
                    type="file"
                    id={`picture-${student.id}`}
                    accept="image/*"
                    className="py-2"
                    onChange={(e) =>
                      handleStudentChange(
                        index,
                        "picture",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddStudent}
              className="mt-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.06]"
            >
              + Add Another Student
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
            >
              Create Group
            </button>
          </div>
        </div>
      </ComponentCard>
    </form>
  );
}
