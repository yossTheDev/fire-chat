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
      <div className="flex flex-col items-center font-bold text-neutral-900 dark:text-neutral-300">
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

      <div className="p-6 max-w-md w-full items-center justify-center flex flex-col">
        <p className="mt-4 text-gray-500 text-center">
          Inicia sesión usando tu cuenta de Google
        </p>
        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-fit py-2 px-4 flex items-center justify-center gap-2 bg-neutral-200 dark:bg-neutral-100 text-neutral-900 font-semibold rounded-full hover:bg-neutral-500/40 dark:hover:bg-neutral-300 transition duration-300"
        >
          <svg
            className="size-6"
            viewBox="0 0 256 262"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            />
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            />
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            />
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            />
          </svg>
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
