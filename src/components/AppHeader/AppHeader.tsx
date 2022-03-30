import { ReactNode } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { AppBar } from "../AppBar";
import { Text } from "../Text";
import { IconButton } from "../IconButton";
import { useTheme } from "@/providers";

interface AppHeaderProps {
  title: ReactNode;
}

export const AppHeader = ({ title }: AppHeaderProps) => {
  const { mode, setMode } = useTheme();

  return (
    <AppBar>
      <Text component="h1" variant="h3" color="inherit" flexGrow={1}>
        {title}
      </Text>

      {/* Theme switcher. */}
      <IconButton
        color="inherit"
        icon={mode === "light" ? MoonIcon : SunIcon}
        edge="end"
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        aria-label="Toggle light/dark mode"
      />
    </AppBar>
  );
};
