// src/pages/NotFound.tsx

import { Link, useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">
        Page not found. The route you tried doesn’t exist.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border bg-background hover:bg-gray-50 dark:hover:text-black"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-md border bg-primary text-primary-foreground hover:opacity-90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
