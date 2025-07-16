import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-purple-400 mb-4"
      >
        About HealthHub
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 mb-6 leading-relaxed"
      >
        HealthHub is a modern healthcare platform that bridges the gap between
        patients and certified doctors. We aim to make healthcare more
        accessible, transparent, and seamless for everyone.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 leading-relaxed"
      >
        With our intuitive appointment system, verified doctor profiles, and
        secure medical record management, we bring convenience to your
        fingertips. Whether you’re a patient seeking the best care or a doctor
        managing your practice, HealthHub empowers you with the right tools.
      </motion.p>
    </div>
  );
}
