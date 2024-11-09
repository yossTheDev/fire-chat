"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "#0a0a0a");
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", "white");
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      className="p-2 rounded-full dark:bg-neutral-800 bg-neutral-200 dark:hover:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition duration-300"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
