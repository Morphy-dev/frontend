const API_BASE = "http://localhost:5000";

export interface AuthResponse {
  token: string;
  user: { id: string; name: string; role: string };
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Invalid credentials");
  return response.json();
}

export async function registerUser(name: string, email: string, password: string, role: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
  
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  }

export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface Progress {
  courseId: string;
  userId: string;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
}

export const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found, redirecting to login...");
      throw new Error("No authentication token found");
    }
    const res = await fetch(`${API_BASE}/api/courses`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    console.log(res)
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Error fetching courses:", errorData);
      throw new Error(errorData.error || "Failed to load courses");
    }
  
    return res.json();
  };

export const fetchUser = async (token: string) => {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (!res.ok) throw new Error("Failed to fetch user");
  
    return res.json();
  };
  

  export const fetchProgress = async (courseId: string, token: string) => {
    if (!token) throw new Error("No authentication token found");
  
    const res = await fetch(`${API_BASE}/api/progress/${courseId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // ✅ Ensure token is included
        "Content-Type": "application/json"
      },
    });
  
    if (!res.ok) {
      const errorData = await res.json();
      console.error(`❌ Failed to fetch progress for course ${courseId}:`, errorData);
      throw new Error(errorData.error || "Failed to load progress");
    }
  
    return res.json();
  };
  