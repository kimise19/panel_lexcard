import { useThemeMode } from "flowbite-react";
import darkLogo from "/icon.png";
import lightLogo from "/icon.png";

export default function LogoLoader() {
  const { mode } = useThemeMode();
  const isDarkTheme = mode === "dark";

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src={isDarkTheme ? lightLogo : darkLogo}
          alt="Logo de la Aplicación"
          className="w-80"
        />
        <div className="mt-4 flex space-x-1 font-semibold text-gray-800 dark:text-gray-200">
          {"CARGANDO".split("").map((letter, index) => (
            <span
              key={index}
              className="animate-bounce"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationName: "bounce",
              }}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
