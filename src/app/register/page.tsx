"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../utils/api";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // Default role selection
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData.name, formData.email, formData.password, formData.role);
      router.push("/login"); // Redirect to login after successful registration
    } catch (err) {
      console.error("❌ Registration Error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">Register</h1>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-700 text-white"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-400 underline">Log in</a>
        </p>
      </div>
    </div>
  );
}
