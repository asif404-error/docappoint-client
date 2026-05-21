"use client";
//react hooks
import { useState, useEffect } from "react";

// NextJS Components and hooks
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi"; //react-icons
import { authClient } from "@/lib/auth-client"; //Authentication Client
import toast from "react-hot-toast"; //Toast Notification
import { useRouter } from "next/navigation";
import Image from "next/image"; //Next.js Image Coomponents
import logo from "../public/DocAppointment-logo.png"; //Logo imported from Public folder

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); //State for Mobile Menu Toggle

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appoinments", label: "All Appointments" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav
      className="sticky top-0 z-50 shadow-lg transition-colors duration-300"
      style={{
        backgroundColor: "#0a1628",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
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
                color: "#ffff",
              }}
            >
              Doc<span className="text-emerald-500">Appoint</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color:
                    pathname === link.href
                      ? "#10b981"
                      : "rgba(255,255,255,0.85)",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Image
                  src={
                    session.user.image ||
                    "https://i.ibb.co/6bH9MkL/default-avatar.png"
                  }
                  alt={session.user.name}
                  width={38}
                  height={38}
                  className="rounded-full border-2 border-emerald-400 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                    border: "2px solid rgba(255,255,255,0.5)",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: "#ffff",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold text-white bg-emerald-500 px-5 py-2 rounded-full hover:bg-emerald-600 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
        {menuOpen && (
          <div
            className="md:hidden px-4 py-4 rounded-b-2xl transition-colors duration-300"
            style={{
              backgroundColor: "#f9fafb",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium py-3 border-b transition-colors duration-200"
                style={{
                  color: pathname === link.href ? "#10b981" : "#374151",
                  borderColor: "#e5e7eb",
                }}
              >
                {link.label}
              </Link>
            ))}

            {session ? (
              <div className="flex items-center gap-3 pt-4">
                <Image
                  src={
                    session.user.image ||
                    "https://i.ibb.co/6bH9MkL/default-avatar.png"
                  }
                  alt={session.user.name}
                  width={34}
                  height={34}
                  className="rounded-full border-2 border-emerald-400 object-cover"
                />
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "transparent",
                    color: "#374151",
                    border: "2px solid #d1d5db",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: "#374151",
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-white bg-emerald-500 px-5 py-2 rounded-full text-center hover:bg-emerald-600 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
