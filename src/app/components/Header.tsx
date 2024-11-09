"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authProvider";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-white dark:bg-neutral-900  p-4 drop-shadow-md dark:drop-shadow-sm dark:text-white text-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          FireChat
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex gap-2 dark:bg-neutral-800 bg-neutral-200 items-center py-2 px-3 rounded-full">
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
                <span className=" hidden sm:inline text-sm">
                  {user.displayName || "Usuario"}
                </span>

                <button
                  name="Logout"
                  onClick={handleLogout}
                  className="ml-4 px-3 py-1 text-sm  font-semibold rounded "
                >
                  <LogOut className="size-5"></LogOut>
                </button>
              </div>
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
