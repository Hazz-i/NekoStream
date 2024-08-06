import { ThemeProvider } from "@/components/theme-providers";
import Header from "@/components/layout/Header";
import Bottom from "@/components/layout/Bottom";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme">
      <Header />
      <Outlet />
      <Bottom />
    </ThemeProvider>
  );
}
