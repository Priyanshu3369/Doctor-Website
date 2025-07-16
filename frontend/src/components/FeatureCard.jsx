import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-all hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-purple-400 mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
