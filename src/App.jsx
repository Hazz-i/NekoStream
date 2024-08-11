import { ThemeProvider } from "@/components/theme-providers";
import Header from "@/components/layout/Header";
import Bottom from "@/components/layout/Bottom";
import { Outlet } from "react-router-dom";
import { ContextProvider } from "@/context/contextProviders";
import { SearchProvider } from "@/context/searchProvier";

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme">
      <SearchProvider>
        <Header />
        <ContextProvider>
          <Outlet />
        </ContextProvider>
        <Bottom />
      </SearchProvider>
    </ThemeProvider>
  );
}
