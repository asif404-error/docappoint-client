import { FiShield, FiClock, FiStar, FiHeart } from "react-icons/fi";

// Features data array for dynamically rendering cards
const features = [
  {
    // Security & trust feature
    icon: <FiShield size={28} />,
    title: "Verified Doctors",
    description:
      "All our doctors are thoroughly verified with valid medical licenses and years of proven experience.",
  },
  {
    // Fast booking feature
    icon: <FiClock size={28} />,
    title: "Quick Booking",
    description:
      "Book your appointment in less than 2 minutes. No paperwork, no long queues, no hassle.",
  },
  {
    // Ratings & reviews feature
    icon: <FiStar size={28} />,
    title: "Top Rated Care",
    description:
      "Read genuine patient reviews and ratings to choose the best doctor for your needs.",
  },
  {
    // Patient-centered care feature
    icon: <FiHeart size={28} />,
    title: "Patient First",
    description:
      "We prioritize your health and comfort with a seamless and personalized booking experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-500 text-sm font-semibold uppercase tracking-widest">
            Why Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Why Choose DocAppoint?
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            We are committed to making healthcare accessible, affordable and
            convenient for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-5">
                {feature.icon}
              </div>
              <h3
                className="text-lg font-bold text-gray-900 mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}