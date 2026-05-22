"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiMapPin, FiStar, FiClock } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function TopDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();

  // // Fetched top-rated doctors from MongoDB component mounts
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/top-rated`)
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data); // Store fetched doctors data into state
        setLoading(false); // Stop loading spinner after data is loaded
      })
      .catch(() => setLoading(false)); // Stop loading even if request fails
  }, []);

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">
            Our Best
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Top Rated Doctors
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Meet our highest-rated specialists trusted by thousands of patients
            across Dhaka.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <span className="loading loading-spinner loading-lg text-emerald-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
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
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500 "
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
        <div className="text-center mt-12">
          <Link href="/appoinments" className="btn-outline px-10 py-3">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}

// features of this section:
// > This section displays top rated doctors
// > All data fetched dynamically from MongoDB
