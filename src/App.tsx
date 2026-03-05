import { ThemeProvider } from "@/components/theme-provider";

import { ThemeToggler } from "@/components/ThemeToggler";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ThemeToggler />
    </ThemeProvider>
  );
}

export default App;
