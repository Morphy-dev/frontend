"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCourses, fetchProgress, Course, Progress } from "../../utils/api";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<{ [key: string]: Progress }>({});
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({ name: "Guest" }); // ✅ Prevent crashes
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
          setError("Failed to load courses");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Error loading dashboard:", error);
      router.replace("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-600 text-center">You are not enrolled in any courses yet.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => {
              const progress = progressData[course.id];
              return (
                <li
                  key={course.id}
                  className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.description}</p>
                    {progress !== null && (
                      <p className="text-sm font-medium text-green-600">
                        Progress: {progress.progressPercentage}%
                      </p>
                    )}
                  </div>
                  <a
                    href={`/courses/${course.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
