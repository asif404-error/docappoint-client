const steps = [
  {
    step: "01",
    title: "Browse Doctors",
    description:
      "Search and filter from our wide range of verified specialist doctors.",
  },
  {
    step: "02",
    title: "View Details",
    description:
      "Check doctor profiles, specialties, availability and consultation fees.",
  },
  {
    step: "03",
    title: "Book Appointment",
    description:
      "Fill in your details and confirm your appointment in just a few clicks.",
  },
  {
    step: "04",
    title: "Get Treated",
    description:
      "Visit the doctor at your scheduled time and get the care you deserve.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest">
            Simple Process
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2 mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            How It Works
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Getting the right doctor has never been this simple. Follow these
            four easy steps.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center bg-gray-100 p-4 rounded-2xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500 border-opacity-40 bg-emerald-500 bg-opacity-10 flex items-center justify-center mx-auto mb-6">
                <span
                  className="text-2xl font-bold text-emerald-50"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {step.step}
                </span>
              </div>
              <h3
                className="text-lg font-bold text-gray-800 mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}