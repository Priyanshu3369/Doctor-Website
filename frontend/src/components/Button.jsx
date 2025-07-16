export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-4 py-2 font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}
