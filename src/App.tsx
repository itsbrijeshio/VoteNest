import { ThemeProvider } from "./components";
import Router from "./routes/Router";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system">
        <QueryClientProvider client={new QueryClient()}>
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
