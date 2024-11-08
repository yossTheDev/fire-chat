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
