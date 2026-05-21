import HeroBanner from "@/components/HeroBanner";
import TopDoctors from "@/components/TopDoctors";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";

export const metadata = {
  title: "DocAppoint — Book Doctor Appointments Online",
  description:
    "Browse top-rated doctors and book appointments instantly with DocAppoint.",
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TopDoctors />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}