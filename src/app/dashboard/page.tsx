"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCourses, fetchLessons, fetchProgress, Course, Lesson, Progress } from "../../utils/api";

export default function Dashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessonData, setLessonData] = useState<{ [courseId: string]: Lesson[] }>({});
  const [progressData, setProgressData] = useState<{ [lessonId: string]: Progress | null }>({});
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
      .then((coursesData) => {
        console.log("✅ Courses received:", coursesData);
        setCourses(coursesData);

        if (coursesData.length === 0) {
          setLoading(false);
          return;
        }

        return Promise.all(
          coursesData.map((course) =>
            fetchLessons(course.id, token)
              .then((lessons) => ({ courseId: course.id, lessons }))
              .catch(() => ({ courseId: course.id, lessons: [] }))
          )
        );
      })
      .then((lessonsResults) => {
        if (!lessonsResults) {
            router.replace("/login");
            return;
        };

        const lessonsMap: { [courseId: string]: Lesson[] } = {};
        lessonsResults.forEach(({ courseId, lessons }) => {
          lessonsMap[courseId] = lessons;
        });

        setLessonData(lessonsMap);

        const allLessonIds = lessonsResults.flatMap(({ lessons }) => lessons.map((lesson) => lesson.id));

        return Promise.all(
          allLessonIds.map((lessonId) =>
            fetchProgress(lessonId, token)
              .then((progress) => ({ lessonId, progress }))
              .catch(() => ({ lessonId, progress: null }))
          )
        );
      })
      .then((progressResults) => {
        if (!progressResults) return;

        const progressMap: { [lessonId: string]: Progress | null } = {};
        progressResults.forEach(({ lessonId, progress }) => {
          progressMap[lessonId] = progress;
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
              const lessons = lessonData[course.id] || [];

              return (
                <li key={course.id} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                      <p className="text-sm text-gray-300">{course.description}</p>
                    </div>
                    <button
                      onClick={() => router.push(`/courses/${course.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      View Course
                    </button>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {lessons.length === 0 ? (
                      <p className="text-gray-400">No lessons available.</p>
                    ) : (
                      lessons.map((lesson) => {
                        const progress = progressData[lesson.id];

                        return (
                          <li key={lesson.id} className="bg-gray-600 p-3 rounded-lg shadow flex justify-between items-center">
                            <div>
                              <h4 className="text-md font-medium text-white">{lesson.title}</h4>
                              <p className="text-sm text-gray-300">{lesson.description}</p>
                              {progress == null ? (  <p className="text-yellow-400">Not Started</p>
): (
                                <p className="text-sm font-medium text-green-400">
                                  Progress: {progress?.progressPercentage || 0}%
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => router.push(`/lessons/${lesson.id}`)}
                              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                              View Lesson
                            </button>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}