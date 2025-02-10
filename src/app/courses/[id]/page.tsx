"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCourse, fetchLessons, Course, Lesson } from "../../../utils/api";

export default function CoursePage() {
  const { id: courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!courseId) {
      setError("Invalid course ID");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        console.log(`📡 Fetching course details for ID: ${courseId}`);
        const courseData = await fetchCourse(courseId, token);
        console.log(`✅ Course data loaded:`, courseData);
        setCourse(courseData);

        console.log(`📡 Fetching lessons for course ID: ${courseId}`);
        const lessonData = await fetchLessons(courseId, token);
        console.log(`✅ Lessons loaded:`, lessonData);
        setLessons(lessonData);
      } catch (err) {
        console.error("❌ Failed to load course or lessons:", err);
        setError("Failed to load course data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  if (loading) return <p className="text-center mt-10 text-gray-200 text-xl">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-400 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white">{course?.title}</h1>
        <p className="text-lg text-gray-300">{course?.description}</p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-200">Teacher</h2>
        <p className="text-gray-400">
          {course?.teacher?.name} - {course?.teacher?.email}
        </p>

        {/* Lessons List */}
        <h2 className="text-2xl font-semibold mt-6 text-gray-200">Lessons</h2>
        {lessons.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="bg-gray-700 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{lesson.title}</h3>
                <p className="text-gray-400">{lesson.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4">No lessons available for this course.</p>
        )}
         <button
          onClick={() => router.back()}
          className="mt-4 text-blue-400 underline"
        >
          ← Back to all Courses
        </button>
      </div>
      
    </div>
  );
}
