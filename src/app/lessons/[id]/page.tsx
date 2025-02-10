"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  fetchLesson,
  fetchProgress,
  markLessonComplete,
  updateLessonProgress,
  unmarkLessonComplete,
  createLessonProgress, // Make sure this function is exported from your API file
  Lesson,
} from "../../../utils/api";

export default function LessonPage() {
  const { id: lessonId } = useParams();
  const router = useRouter();

  // Change progress state to accept null (not started) or a number (progress percentage)
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
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

        // Fetch progress and if none exists, keep progress as null.
        const progressData = await fetchProgress(lessonId, token);
        setProgress(progressData?.progressPercentage ?? null);
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
      await updateLessonProgress(lessonId, 100, token);
      setProgress(100);
    } catch (err) {
      console.error("❌ Failed to mark lesson as complete:", err);
    }
  };

  const handleIncrementProgress = async () => {
    if (progress === null || progress >= 100) return;
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const newProgress = Math.min(progress + 20, 100); // Increase by 20%, up to 100%
      await updateLessonProgress(lessonId, newProgress, token);
      setProgress(newProgress);
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  // Updated: Creates a new progress record instead of updating an existing one.
  const handleStartLesson = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const progressData = await createLessonProgress(lessonId, token);
      setProgress(progressData.progressPercentage ?? 0);
    } catch (err) {
      console.error("Failed to start lesson:", err);
    }
  };

  const handleUndoProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      await updateLessonProgress(lessonId, 0, token);
      setProgress(0);
    } catch (err) {
      console.error("❌ Failed to reset progress:", err);
    }
  };

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold">{lesson?.title || "No Title Found"}</h1>
        <p className="text-gray-400 text-sm">
          Created: {lesson?.createdAt ? new Date(lesson.createdAt).toLocaleDateString() : "Unknown"} |
          Updated: {lesson?.updatedAt ? new Date(lesson.updatedAt).toLocaleDateString() : "Unknown"}
        </p>
        <p className="mt-4 text-gray-300">
          {lesson?.content || "No content available."}
        </p>
        
        {/* Progress Section */}
        <div className="mt-6">
          {progress === null ? (
            // Display when the lesson hasn't been started yet
            <div>
              <p className="text-gray-300">Not Started</p>
              <button
                onClick={handleStartLesson}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-2"
              >
                Start Lesson
              </button>
            </div>
          ) : (
            // Display once progress exists
            <div>
              <p className="text-gray-300">Progress: {progress}%</p>
              <div className="w-full bg-gray-600 h-3 rounded">
                <div className="h-3 bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="mt-4 space-x-2">
                {progress < 100 ? (
                  <>
                    <button
                      onClick={handleIncrementProgress}
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Increase Progress
                    </button>
                    <button
                      onClick={handleMarkComplete}
                      className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
                    >
                      Mark as Completed
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleUndoProgress}
                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                  >
                    Undo Completion
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
  
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-400 underline"
        >
          ← Back to Courses
        </button>
      </div>
    </div>
  );
}
