"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";

export default function DoctorDetailsClient() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  console.log(id);
  useEffect(() => {
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDoctor(data);
          console.log(data);
          setLoading(false);
        })
        .catch(() => {});
    }
    if (id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch(() => {});
    }
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login to add a review!");
      return;
    }
    setReviewLoading(true);
    try {
      const reviewData = {
        doctorId: id,
        userEmail: session?.user?.email,
        userName: session?.user?.name,
        userImage: session?.user?.image,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      if (res.ok) {
        const newReview = await res.json();
        setReviews([...reviews, { ...reviewData, _id: newReview.insertedId }]);
        setReviewForm({ rating: 5, comment: "" });
        toast.success("Review added successfully!");
      }
    } catch (error) {
      toast.error("Failed to add review!");
    } finally {
      setReviewLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const appointmentData = {
        userEmail: session?.user?.email,
        doctorName: doctor?.name,
        patientName: formData.patientName,
        gender: formData.gender,
        phone: formData.phone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        },
      );

      if (res.ok) {
        toast.success("Appointment booked successfully!");
        setModalOpen(false);
        setFormData({
          patientName: "",
          gender: "",
          phone: "",
          appointmentDate: "",
          appointmentTime: "",
        });
      } else {
        toast.error("Failed to book appointment!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-500" />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Doctor not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-72 lg:h-auto">
              <Image
                src={doctor.image}
                alt={doctor.name}
                width={600}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-8 sm:p-10">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                {doctor.specialty}
              </span>

              <h1
                className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-2"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {doctor.name}
              </h1>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {doctor.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiMapPin size={16} className="text-emerald-500 shrink-0" />
                  <span>
                    {doctor.hospital} — {doctor.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiClock size={16} className="text-emerald-500 shrink-0" />
                  <span>{doctor.experience} experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiDollarSign
                    size={16}
                    className="text-emerald-500 shrink-0"
                  />
                  <span>Consultation Fee: ৳{doctor.fee}</span>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Available Hours
                </h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availability?.map((time, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-10 py-3 rounded-full transition-all duration-300 text-sm"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white rounded-3xl shadow-md p-8">
        <h2
          className="text-2xl font-bold text-gray-900 mb-8"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Patient Reviews
        </h2>
        {session && (
          <form
            onSubmit={handleReview}
            className="mb-10 bg-gray-50 rounded-2xl p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Write a Review
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={reviewForm.rating}
                onChange={(e) =>
                  setReviewForm({
                    ...reviewForm,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full sm:w-48 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                <option value={3}>⭐⭐⭐ (3/5)</option>
                <option value={2}>⭐⭐ (2/5)</option>
                <option value={1}>⭐ (1/5)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                placeholder="Share your experience with this doctor..."
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={reviewLoading}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 text-sm disabled:opacity-60"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
        {reviews.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">
              No reviews yet. Be the first to review!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="flex gap-4 pb-6 border-b border-gray-100 last:border-0"
              >
                <Image
                  src={
                    review.userImage ||
                    "https://i.ibb.co/6bH9MkL/default-avatar.png"
                  }
                  alt={review.userName}
                  width={44}
                  height={44}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-emerald-400"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">
                      {review.userName}
                    </h4>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-sm">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 max-h-[90vh] overflow-y-auto">
            <h2
              className="text-2xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Book Appointment
            </h2>
            <p className="text-gray-500 text-sm mb-6">with {doctor.name}</p>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name (Read Only)
                </label>
                <input
                  type="text"
                  value={doctor.name}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email (Read Only)
                </label>
                <input
                  type="text"
                  value={session?.user?.email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  placeholder="Enter patient name"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentDate: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <select
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentTime: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200 text-gray-800"
                >
                  <option value="">Select Time</option>
                  {doctor.availability?.map((time, i) => (
                    <option key={i} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {bookingLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
