"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../public/DocAppointment-logo.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="transition-colors duration-300"
      style={{
        backgroundColor: "#0a1628",
        color: "#0f172a",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Brand Info section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
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
              {/* Brand Title */}
              <span
                className="text-xl font-bold transition-colors duration-300"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#ffff",
                }}
              >
                Doc<span className="text-emerald-500">Appoint</span>
              </span>
            </div>
            {/* This is Brand Description */}
            <p
              className="text-sm leading-relaxed transition-colors duration-300"
              style={{ color: "#6b7280" }}
            >
              Your trusted platform for booking doctor appointments online.
              Quality healthcare made simple and accessible.
            </p>
          </div>
          {/* This is Quick Navigation Link Section */}
          <div>
            <h4 className="text-emerald-500 text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/appointments", label: "All Appointments" },
                { href: "/dashboard/my-bookings", label: "My Bookings" },
                { href: "/dashboard/my-profile", label: "My Profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-emerald-500 transition-colors duration-200"
                    style={{
                      color: "#6b7280",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-emerald-500 text-lg font-semibold mb-4">
              Follow Us
            </h4>
            {/* This is Social Media Icons Section */}
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { icon: <FaFacebook size={18} />, href: "#" },
                { icon: <FaXTwitter size={18} />, href: "#" },
                { icon: <FaLinkedin size={18} />, href: "#" },
                { icon: <FaInstagram size={18} />, href: "#" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300"
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                  }}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
            {/* This is CopyRight Text Section */}
            <p
              className="text-sm mt-6 transition-colors duration-300"
              style={{
                color: "#9ca3af",
              }}
            >
              © 2026 DocAppoint. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
