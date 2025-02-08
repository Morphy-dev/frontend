"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProgress, Progress } from "../../../utils/api";

export default function CourseProgress() {
  const { id } = useParams();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    fetchProgress(id as string, token)
      .then(setProgress)
      .catch((err) => setError(err.message));
  }, [id]);

  return (
    <div>
      <h1>Course Progress</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {progress ? (
        <div>
          <p>{`Completed ${progress.completedLessons} out of ${progress.totalLessons}`}</p>
          <p>{`Progress: ${progress.progressPercentage}%`}</p>
        </div>
      ) : (
        <p>Loading progress...</p>
      )}
    </div>
  );
}
