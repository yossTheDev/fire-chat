"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authProvider";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-neutral-200 p-4 shadow-md dark:text-white text-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          MiApp
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.photoURL && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Usuario"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="text-white hidden sm:inline">
                {user.displayName || "Usuario"}
              </span>
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 text-sm bg-white text-blue-600 font-semibold rounded hover:bg-blue-100"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link href="/login" className="text-white hover:text-blue-200">
              Iniciar sesión
            </Link>
          )}

          <ThemeToggle></ThemeToggle>
        </div>
      </div>
    </header>
  );
}
