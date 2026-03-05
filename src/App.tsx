import { StrictMode } from "react"

import { ThemeProvider } from "@/components/theme-provider"

import { ThemeToggler } from "@/components/ThemeToggler"

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ThemeToggler />
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
