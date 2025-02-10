"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchLesson, fetchProgress, Lesson, Progress } from "../../../utils/api";

export default function LessonPage() {
  const { id: lessonId } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!lessonId) {
      setError("Invalid lesson ID");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        console.log(`📡 Fetching lesson details for ID: ${lessonId}`);
        const lessonData = await fetchLesson(lessonId);
        setLesson(lessonData);

        console.log(`📡 Fetching progress for lesson: ${lessonId}`);
        const progressData = await fetchProgress(lessonId);
        setProgress(progressData);
      } catch (err) {
        console.error("❌ Failed to load lesson data:", err);
        setError("Failed to load lesson data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [lessonId]);

  if (loading) return <p className="text-center mt-10 text-gray-200 text-xl">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-400 text-xl">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white">{lesson?.title}</h1>
        <p className="text-lg text-gray-300">{lesson?.description}</p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-200">Progress</h2>
        <p className={`text-lg ${progress?.progressPercentage === 100 ? "text-green-400" : "text-yellow-400"}`}>
          {progress ? `${progress.progressPercentage}% Completed` : "Not started"}
        </p>

        <button
          className={`mt-4 px-4 py-2 rounded-lg ${
            progress?.progressPercentage === 100 ? "bg-red-600" : "bg-green-600"
          } hover:opacity-75 transition`}
        >
          {progress?.progressPercentage === 100 ? "Undo Completion" : "Mark as Completed"}
        </button>
      </div>
    </div>
  );
}
