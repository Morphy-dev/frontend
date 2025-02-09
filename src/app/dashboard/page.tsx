"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCourses, fetchProgress, Course, Progress } from "../../utils/api";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<{ [key: string]: Progress }>({});
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    fetchCourses()
      .then((data) => {
        setCourses(data);
        if (data.length === 0) {
          setLoading(false);
          return;
        }

        return Promise.all(
          data.map((course) =>
            fetchProgress(course.id, token)
              .then((progress) => ({ courseId: course.id, progress }))
              .catch(() => ({ courseId: course.id, progress: null }))
          )
        );
      })
      .then((progressResults) => {
        if (!progressResults) return;

        const progressMap: { [key: string]: Progress | null } = {};
        progressResults.forEach(({ courseId, progress }) => {
          progressMap[courseId] = progress;
        });

        setProgressData(progressMap);
      })
      .catch(() => {
        setError("Failed to load courses.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-10 text-gray-200 text-xl">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-400 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Welcome, {user?.name || "User"}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Your Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">You are not enrolled in any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => {
              const progress = progressData[course.id];
              return (
                <li
                  key={course.id}
                  className="bg-gray-700 p-4 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                    <p className="text-sm text-gray-300">{course.description}</p>
                    {progress !== null && (
                      <p className="text-sm font-medium text-green-400">
                        Progress: {progress.progressPercentage}%
                      </p>
                    )}
                  </div>
                  <a
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                  >
                    View Course
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
