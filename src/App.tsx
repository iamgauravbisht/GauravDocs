import "./App.css";
// import Auth from "@/components/Auth";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Home from "./components/Home";
// import TextEditor from "./components/TextEditor";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      {/* text Editor */}
      {/* <TextEditor /> */}

      {/* <div className="w-full py-12 border-b flex flex-col justify-start items-center flex-1"> */}
      {/* if not logged in Display this component */}
      {/* <Auth /> */}

      {/* if logged in Display this component */}
      {/* <Home /> */}
      {/* </div> */}
      <Footer />
    </ThemeProvider>
  );
}

export default App;
