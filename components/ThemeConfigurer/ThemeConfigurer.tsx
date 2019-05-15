import { useTheme } from "next-themes";
import React from "react";
import { Moon, Sun } from "react-feather";

type Props = {};

export default function ThemeConfigurer({}: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-5 right-10 cursor-pointer">
      {theme === "dark" ? (
        <Moon onClick={() => setTheme("light")} />
      ) : (
        <Sun onClick={() => setTheme("dark")} />
      )}
    </div>
  );
}
