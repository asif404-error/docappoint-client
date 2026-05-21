"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FiMapPin, FiStar, FiClock, FiSearch } from "react-icons/fi";
import Image from "next/image";

export default function AllAppointmentsClient() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filteredData = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFiltered(filteredData);
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedData = [...filtered];
    if (value === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    } else if (value === "fee_low") {
      sortedData.sort((a, b) => a.fee - b.fee);
    } else if (value === "fee_high") {
      sortedData.sort((a, b) => b.fee - a.fee);
    } else if (value === "experience") {
      sortedData.sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience),
      );
    }
    setFiltered(sortedData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">
            Our Doctors
          </span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            All Appointments
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Browse our wide range of verified specialist doctors and book your
            appointment instantly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-10">
          <div className="relative flex-1">
            <FiSearch
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by doctor name..."
              className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200 bg-white"
            />
          </div>
          <select
            value={sortBy}
            onChange={handleSort}
            className="px-5 py-3 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200 bg-white text-gray-600 font-medium"
          >
            <option value="">Sort By</option>
            <option value="rating">Highest Rating</option>
            <option value="fee_low">Fee: Low to High</option>
            <option value="fee_high">Fee: High to Low</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-emerald-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No doctors found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={400}
                    height={224}
                    className="w-full object-contain h-full hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-amber-400 text-white">
                    <FiStar size={12} />
                    {doctor.rating}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full w-fit bg-emerald-50 text-emerald-600">
                    {doctor.specialty}
                  </span>
                  <h3
                    className="text-xl font-bold mt-3 mb-1 text-gray-900"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {doctor.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <FiMapPin size={13} />
                    {doctor.hospital}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
                    <FiClock size={13} />
                    {doctor.experience} experience
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-lg text-gray-900">
                      ৳{doctor.fee}
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        /visit
                      </span>
                    </span>
                    <Link
                      href={session ? `/appoinments/${doctor._id}` : "/login"}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
