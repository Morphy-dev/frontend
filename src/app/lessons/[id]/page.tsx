"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchLesson,
  fetchProgress,
  markLessonComplete,
  updateLessonProgress,
  unmarkLessonComplete,
  Lesson,
} from "../../../utils/api";

export default function LessonPage() {
  const { id: lessonId } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
  
    (async () => {
      try {
        console.log(`📡 Fetching lesson details for ID: ${lessonId}`);
        const lessonData = await fetchLesson(lessonId);
  
        setLesson(lessonData[0]);
         // Fetch progress
         const progressData = await fetchProgress(lessonId, token);
         setProgress(progressData?.progressPercentage || 0);
      } catch (err) {
        console.error("❌ Failed to load lesson data:", err);
        setError("Failed to load lesson data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [lessonId]);
  

  const handleMarkComplete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await markLessonComplete(lessonId, token);
      setProgress(100);
    } catch (err) {
      console.error("Failed to mark progress:", err);
    }
  };

  const handleIncrementProgress = async () => {
    if (progress >= 100) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const newProgress = Math.min(progress + 20, 100); // Increase by 20%, max 100%
      await updateLessonProgress(lessonId, newProgress, token);
      setProgress(newProgress);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  const handleUndoProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await unmarkLessonComplete(lessonId, token);
      setProgress(0);
    } catch (err) {
      console.error("Failed to unmark progress:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold">{lesson?.title || "No Title Found"}</h1>
  
        {/* ✅ Lesson Meta Info */}
        <p className="text-gray-400 text-sm">
          Created: {lesson?.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "Unknown"} |
          Updated: {lesson?.updatedAt ? new Date(lesson.updatedAt).toLocaleDateString() : "Unknown"}
        </p>
  
        {/* ✅ Lesson Content */}
        <p className="mt-4 text-gray-300">{lesson?.description || "No content available."}</p>
  
        {/* ✅ Progress Bar */}
        <div className="mt-6">
          <p className="text-gray-300">Progress: {progress}%</p>
          <div className="w-full bg-gray-600 h-3 rounded">
            <div className="h-3 bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
  
        {/* ✅ Action Buttons */}
        <div className="mt-4 space-x-2">
          {progress < 100 ? (
            <>
              <button onClick={handleIncrementProgress} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Increase Progress
              </button>
              <button onClick={handleMarkComplete} className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                Mark as Completed
              </button>
            </>
          ) : (
            <button onClick={handleUndoProgress} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
              Undo Completion
            </button>
          )}
        </div>
  
        {/* ✅ Navigation */}
        <button onClick={() => router.back()} className="mt-4 text-blue-400 underline">
          ← Back to Course
        </button>
      </div>
    </div>
  );
  
}
