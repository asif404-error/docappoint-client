import Link from "next/link";

export const metadata = {
  title: "404 Not Found — DocAppoint",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-[8rem] sm:text-[12rem] font-extrabold leading-none text-emerald-400"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          404
        </h1>
        <h2
          className="text-2xl sm:text-4xl font-bold  mt-4 mb-4"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Page Not Found
        </h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-10">
          Oops! The page you are looking for does not exist or has been moved.
          Please go back to the home page.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm"
          >
            Go Back Home
          </Link>
          <Link
            href="/appoinments"
            className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm"
          >
            Browse Doctors
          </Link>
        </div>
      </div>
    </div>
  );
}
