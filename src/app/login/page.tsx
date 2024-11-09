/* eslint-disable @next/next/no-img-element */
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
      router.push("/");
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
    <div className="flex flex-col items-center justify-center h-screen dark:bg-neutral-900">
      <div className="flex flex-col items-center font-bold text-neutral-900">
        <img
          className="size-24"
          src="/FireChatIcon.svg"
          alt="FireChat Logo"
        ></img>

        <h1 className="text-5xl mt-4">Bienvenido</h1>
        <h2 className="text-3xl">
          a <span className="text-[#FF8239]">FireChat</span>
        </h2>
      </div>

      <div className="p-6 max-w-md w-full">
        <p className="mt-4 text-gray-500 text-center">
          Inicia sesión usando tu cuenta de Google
        </p>
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          <svg
            className="size-5"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Google</title>
            <path
              fill="currentColor"
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            />
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
