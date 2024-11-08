// app/login/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authProvider";

export default function Page() {
  const { loginWithGoogle, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/profile");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 max-w-md w-full bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Iniciar Sesión
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          Inicia sesión usando tu cuenta de Google
        </p>
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8c0-17.8-1.5-35.6-4.7-52.7H248v99.8h135.7c-5.9 31.9-23.4 58.8-49.8 76.7l-.5 3.5 72.5 56.5 5 1c32.5-30.1 51.1-74.6 51.1-127.8z"
            />
            <path
              fill="currentColor"
              d="M250 484c64.8 0 119.2-21.5 158.9-58.3l-76-59c-21.7 14.5-49.4 23.2-82.9 23.2-63.6 0-117.7-43-137.1-101.2l-2.8.2-74.4 58.4-1.3 3.1c38.4 76 117.7 133.8 215.6 133.8z"
            />
            <path
              fill="currentColor"
              d="M112.9 295.5c-5.3-15.9-8.3-32.8-8.3-50.5s3-34.6 8.3-50.5l-74.4-58.4c-15.8 31.7-24.9 67.4-24.9 108.9s9.1 77.1 24.9 108.9l74.4-58.4z"
            />
            <path
              fill="currentColor"
              d="M250 97.8c35.4 0 67 12.2 92.2 36.2l69.1-68.7C345.5 27.8 299.9 7 250 7 152.1 7 72.8 64.8 34.4 140.8l74.4 58.4C132.3 143.8 186.4 97.8 250 97.8z"
            />
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
