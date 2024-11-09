/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authProvider";
import { ThemeToggle } from "./ThemeToggle";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <div className="flex gap-2 items-center">
          <img
            className="size-8"
            src="/FireChatIcon.svg"
            alt="FireChat Logo"
          ></img>
          <Link href="/" className="text-2xl font-bold">
            FireChat
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-2 dark:bg-neutral-800 bg-neutral-200 items-center md:py-2 md:px-3 p-1 rounded-full cursor-pointer">
                    {user.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "Usuario"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex size-10 text-2xl font-bold dark:text-neutral-700 text-neutral-700 bg-neutral-400 dark:bg-neutral-900 rounded-full text-center justify-center items-center">
                        <span> {user.displayName?.slice(0, 1)}</span>
                      </div>
                    )}
                    <span className=" hidden sm:inline text-sm mr-2">
                      {user.displayName || "Usuario"}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="size-5"></LogOut> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
