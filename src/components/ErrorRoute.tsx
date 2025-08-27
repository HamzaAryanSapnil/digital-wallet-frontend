/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/RouteError.tsx

import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from "react-router";

export default function RouteErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const getDetail = (err: unknown) => {
    if (isRouteErrorResponse(err)) {
      return (err.data ?? {
        status: err.status,
        statusText: err.statusText,
      }) as unknown;
    }

    const anyErr = err as any;

    if (anyErr && anyErr.isAxiosError) {
      return anyErr.response?.data ?? anyErr.message ?? anyErr;
    }

    if (err instanceof Error) {
      return { message: err.message, name: err.name };
    }

    try {
      return JSON.parse(JSON.stringify(err));
    } catch {
      return String(err);
    }
  };

  const detail = getDetail(error);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
      <p className="mb-2">
        {isRouteErrorResponse(error)
          ? `Status: ${(error as any).status} ${
              (error as any).statusText ?? ""
            }`
          : "An unexpected error occurred while rendering this page."}
      </p>

      <div className="w-full max-w-3xl bg-muted p-4 rounded">
        <pre className="whitespace-pre-wrap text-sm">
          {typeof detail === "string"
            ? detail
            : JSON.stringify(detail, null, 2)}
        </pre>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-md border"
        >
          Go Back
        </button>
        <Link
          to="/"
          className="px-4 py-2 rounded-md border bg-primary text-primary-foreground"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
