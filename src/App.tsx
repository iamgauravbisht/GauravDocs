import "./App.css";
// import Auth from "@/components/Auth";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <div className="w-full py-12 border-b flex flex-col justify-start items-center flex-1">
        {/* <Auth /> */}
        <Home />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
