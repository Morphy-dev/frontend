export const API_URL = "http://localhost:5000"; // ✅ Fixed missing protocol

/**
 * Types for API Responses
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
  teacher?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  lessonId: string;
  userId: string;
  progressPercentage: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

/**
 * Utility function for API requests
 */
const fetchApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  token?: string,
  body?: object
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  console.log(`📡 API Call: ${method} ${url}`);

  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API Error [${method} ${url}]:`, errorText);
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`✅ API Response:`, data);
    return data;
  } catch (error) {
    console.error(`❌ Fetch Error:`, error);
    throw new Error("Network error or invalid response");
  }
};

/**
 * Fetch logged-in user details
 */
export const fetchUser = (token: string): Promise<User> => fetchApi<User>("/api/auth/user", "GET", token);

/**
 * Fetch all courses
 */
export const fetchCourses = (token: string): Promise<Course[]> => fetchApi<Course[]>("/api/courses", "GET", token);

/**
 * Fetch course details by ID
 */
export const fetchCourse = (courseId: string, token: string): Promise<Course> =>
  fetchApi<Course>(`/api/courses/${courseId}`, "GET", token);

/**
 * Fetch lessons for a given course
 */
export const fetchLessons = (courseId: string, token: string): Promise<Lesson[]> =>
  fetchApi<Lesson[]>(`/api/courses/${courseId}/lessons`, "GET", token);

/**
 * Fetch progress for a specific lesson
 */
export const fetchProgress = (lessonId: string, token: string): Promise<Progress> => {
  if (!lessonId) {
    console.error("❌ fetchProgress called with an undefined lessonId");
    throw new Error("Invalid lessonId");
  }

  return fetchApi<Progress>(`/api/progress/${lessonId}`, "GET", token);
};

/**
 * User login
 */
export const loginUser = (email: string, password: string) =>
  fetchApi<{ token: string }>("/api/auth/login", "POST", undefined, { email, password });

/**
 * User registration
 */
export const registerUser = (name: string, email: string, password: string, role: string) =>
  fetchApi<{ message: string }>("/api/auth/register", "POST", undefined, { name, email, password, role });
