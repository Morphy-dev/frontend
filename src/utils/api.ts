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
  token?: string | null,
  body?: object
): Promise<T> => {
  const url = `${API_URL}${endpoint}`;
  console.log(`📡 API Call: ${method} ${url}`);

  // Don't require a token for login or register
  const authToken = token ?? localStorage.getItem("token");
  const isAuthRoute = endpoint.includes("/auth/login") || endpoint.includes("/auth/register");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (authToken && !isAuthRoute) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ API Error [${method} ${url}]:`, errorText);

      if (res.status === 401 && !isAuthRoute) {
        console.warn("⚠️ Token expired or invalid. Logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

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
export const fetchUser = (): Promise<User> => fetchApi<User>("/api/auth/user", "GET");

/**
 * Fetch all courses
 */
export const fetchCourses = (): Promise<Course[]> => fetchApi<Course[]>("/api/courses", "GET");

/**
 * Fetch course details by ID
 */
export const fetchCourse = (courseId: string): Promise<Course> =>
  fetchApi<Course>(`/api/courses/${courseId}`, "GET");

/**
 * Fetch lessons for a given course
 */
export const fetchLessons = (courseId: string): Promise<Lesson[]> =>
  fetchApi<Lesson[]>(`/api/courses/${courseId}/lessons`, "GET");

/**
 * Fetch progress for a specific lesson
 */
export const fetchProgress = async (lessonId: string, token: string): Promise<Progress | null> => {
  if (!lessonId) {
    console.error("❌ fetchProgress called with an undefined lessonId");
    throw new Error("Invalid lessonId");
  }

  try {
    return await fetchApi<Progress>(`/api/progress/${lessonId}`, "GET", token);
  } catch (error) {
    if (error.message.includes("404")) {
      console.warn(`⚠️ No progress found for lesson ${lessonId}, returning null.`);
      return null; // ✅ Return null instead of throwing an error
    }
    throw error; // Only throw if it's another error
  }
};

/**
 * User login
 */
export const loginUser = async (email: string, password: string) => {
  const response = await fetchApi<{ token: string }>("/api/auth/login", "POST", undefined, { email, password });

  // Save the token on successful login
  localStorage.setItem("token", response.token);
  console.log("🔐 Token stored:", response.token);

  return response;
};


/**
 * User registration
 */
export const registerUser = (name: string, email: string, password: string, role: string) =>
  fetchApi<{ message: string }>("/api/auth/register", "POST", undefined, { name, email, password, role });

/**
 * Fetch a single lesson by ID
 */
export const fetchLesson = (lessonId: string,): Promise<Lesson> =>
  fetchApi<Lesson>(`/api/lessons/${lessonId}`, "GET");

export const updateLessonProgress = (lessonId: string, progress: number, token: string) =>
  fetchApi(`/api/progress/${lessonId}`, "PUT", token, { progress });


export const markLessonComplete = (lessonId: string, token: string) =>
  fetchApi(`/api/progress/${lessonId}`, "POST", token);

export const unmarkLessonComplete = (lessonId: string, token: string) =>
  fetchApi(`/api/progress/${lessonId}`, "DELETE", token);
