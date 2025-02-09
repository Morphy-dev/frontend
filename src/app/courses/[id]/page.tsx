"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCourse, Course } from "../../../utils/api";

export default function CoursePage() {
  // Destructure 'id' from useParams and alias it as courseId
  const { id: courseId } = useParams();
  const router = useRouter();

  const [course, setCourse] = useState<Course | null>(null);
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
      } catch (err) {
        console.error("❌ Failed to load course data:", err);
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
      </div>
    </div>
  );
}
