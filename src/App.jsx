import { ThemeProvider } from "@/components/theme-providers";
import Home from "@/Pages/Home";
import "boxicons";

export default function App() {
  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>
  );
}
