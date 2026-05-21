"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "../public/DocAppointment-logo.png";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error.message || "Login failed!");
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error("Google login failed. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 sm:p-10">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 justify-center mb-6"
          >
            <div className="rounded-full flex items-center justify-center shrink-0">
              <span className="">
                <Image
                  src={logo}
                  width={50}
                  height={50}
                  alt="logo"
                  className="rounded-full"
                />
              </span>
            </div>
            <span
              className="text-xl font-bold transition-colors duration-300"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "black",
              }}
            >
              Doc<span className="text-emerald-500">Appoint</span>
            </span>
          </Link>
          <h1
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Login
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back! Please login to your account.
          </p>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-emerald-400 transition-all duration-300 mb-6"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
            />
          </div>
          <div className="text-right">
            <span className="text-sm text-emerald-500 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-sm disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
