"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FiEdit,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiPhone,
  FiUser,
} from "react-icons/fi";

export default function MyBookingsClient() {
  const { data: session } = authClient.useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    gender: "",
    phone: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      const sessionData = await authClient.getSession();
      const token = sessionData?.data?.session?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${session.user.email}`,
      );

      const data = await res.json();

      console.log(data);

      if (Array.isArray(data)) {
        setBookings(data);
      } else if (Array.isArray(data.appointments)) {
        setBookings(data.appointments);
      } else if (Array.isArray(data.data)) {
        setBookings(data.data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      toast.error("Failed to fetch bookings!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`,
        { method: "DELETE" },
      );
      if (res.ok) {
        setBookings(bookings.filter((b) => b._id !== id));
        toast.success("Appointment deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete appointment!");
    }
  };

  const handleUpdateClick = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      patientName: booking.patientName,
      gender: booking.gender,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    });
    setModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments/${selectedBooking._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (res.ok) {
        setBookings(
          bookings.map((b) =>
            b._id === selectedBooking._id ? { ...b, ...formData } : b,
          ),
        );
        toast.success("Appointment updated successfully!");
        setModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to update appointment!");
    } finally {
      setUpdateLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Manage all your doctor appointments here.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-emerald-500" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No bookings found!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(bookings) &&
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-600">
                      {booking.doctorName}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiUser size={15} className="text-emerald-500" />
                      <span>{booking.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiPhone size={15} className="text-emerald-500" />
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar size={15} className="text-emerald-500" />
                      <span>{booking.appointmentDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock size={15} className="text-emerald-500" />
                      <span>{booking.appointmentTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <button
                      onClick={() => handleUpdateClick(booking)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 font-semibold py-2 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300 text-sm"
                    >
                      <FiEdit size={15} />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-500 font-semibold py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 text-sm"
                    >
                      <FiTrash2 size={15} />
                      Delete
                    </button>
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
              className="text-2xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Update Appointment
            </h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name (Read Only)
                </label>
                <input
                  type="text"
                  value={selectedBooking?.doctorName}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Email (Read Only)
                </label>
                <input
                  type="text"
                  value={selectedBooking?.userEmail}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className=" text-left block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) =>
                    setFormData({ ...formData, patientName: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
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
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
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
                <label className="text-left block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <input
                  type="text"
                  value={formData.appointmentTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      appointmentTime: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm focus:outline-none focus:border-emerald-400 transition-colors duration-200"
                />
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
                  disabled={updateLoading}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-all duration-300 disabled:opacity-60"
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
