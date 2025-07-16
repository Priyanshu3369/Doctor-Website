import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Stethoscope,
  UserPlus,
  FileText,
} from "lucide-react";
import Button from "../components/Button";
import FeatureCard from "../components/FeatureCard";

export default function Home() {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-950 text-white">
      {/* Hero */}
      <header className="text-center py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold text-purple-400 mb-4"
        >
          Your Health, Our Priority 💙
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Book appointments, consult top doctors, and manage your medical
          records — all in one place.
        </motion.p>
        <Button
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
          onClick={() => navigate("/book-appointment")}
        >
          Book an Appointment
        </Button>
      </header>

      {/* Search Panel */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto px-4 mb-10"
      >
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Your Location
            </label>
            <input
              type="text"
              placeholder="e.g., Delhi, Mumbai, Bangalore"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Search by Disease or Doctor
            </label>
            <input
              type="text"
              placeholder="e.g., Fever, Cardiologist, Skin"
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-16 max-w-6xl mx-auto">
        <FeatureCard
          icon={<CalendarDays size={32} className="text-purple-400" />}
          title="Upcoming Appointments"
          description="View and manage your scheduled visits."
        />
        <FeatureCard
          icon={<Stethoscope size={32} className="text-purple-400" />}
          title="Find Doctors"
          description="Search top-rated doctors by specialty."
        />
        <FeatureCard
          icon={<UserPlus size={32} className="text-purple-400" />}
          title="Book Appointment"
          description="Quick and easy booking process."
        />
        <FeatureCard
          icon={<FileText size={32} className="text-purple-400" />}
          title="Health Records"
          description="Access prescriptions and past reports."
        />
      </section>

      {/* Testimonials */}
      <section className="bg-gray-900 py-10 px-6">
        <h2 className="text-center text-2xl font-semibold text-purple-400 mb-6">
          What Our Patients Say
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "Excellent platform! Got an appointment in 5 mins.",
            "Doctors are professional and helpful.",
            "Easy to use and very convenient.",
          ].map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="p-6 bg-gray-800 rounded-xl shadow"
            >
              <p className="text-gray-300 italic">“{text}”</p>
              <p className="text-sm mt-2 text-purple-400 font-medium">
                — Patient {idx + 1}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
