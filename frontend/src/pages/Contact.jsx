import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (In real app: connect to backend/email)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-purple-400 mb-4"
      >
        Contact Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 mb-6"
      >
        Got questions or need help? Fill out the form below — we’ll get back to
        you soon.
      </motion.p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block text-gray-400 mb-1">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Message</label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
