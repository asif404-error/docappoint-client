"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const slides = [
  {
    title: "Your Health, Our Priority",
    subtitle:
      "Book appointments with top-rated doctors in Dhaka instantly. Quality healthcare at your fingertips.",
    bg: "linear-gradient(135deg, #0a1628 0%, #112240 50%, #0d3b2e 100%)",
    image:
      "https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21202.jpg",
  },
  {
    title: "Expert Doctors, Trusted Care",
    subtitle:
      "Connect with experienced specialists across cardiology, neurology, dermatology and more.",
    bg: "linear-gradient(135deg, #0d3b2e 0%, #0a1628 50%, #112240 100%)",
    image:
      "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
  },
  {
    title: "Simple Booking, Better Health",
    subtitle:
      "Skip the waiting room hassle. Browse, select and book your preferred doctor in minutes.",
    bg: "linear-gradient(135deg, #112240 0%, #0d3b2e 50%, #0a1628 100%)",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
];

export default function HeroBanner() {
  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative flex items-center w-full overflow-hidden min-h-screen"
              style={{ background: slide.bg }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-gray-400 border border-emerald-500 border-opacity-30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Trusted by 10,000+ Patients
                  </div>
                  <h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-lg text-white text-opacity-75 max-w-2xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center mt-4">
                    <Link href="appoinments" className="btn btn-blue">
                      Book Appointment
                    </Link>
                    <Link href="/appoinments" className="btn btn-blue ">
                      Browse Doctors
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-10 justify-center mt-8">
                    {[
                      { value: "50+", label: "Expert Doctors" },
                      { value: "10K+", label: "Happy Patients" },
                      { value: "15+", label: "Specialties" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <p
                          className="text-5xl font-bold text-emerald-400"
                          style={{ fontFamily: "Playfair Display, serif" }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-sm text-white text-opacity-60 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
