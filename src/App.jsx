import { ThemeProvider } from "@/components/theme-providers";
import Header from "@/components/layout/Header";
import Bottom from "@/components/layout/Bottom";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "@/context/contextProviders";

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme">
      <Header />
      <ContextProvider>
        <Outlet />
      </ContextProvider>
      <Bottom />
    </ThemeProvider>
  );
}
