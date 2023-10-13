import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "@/components/Auth";
import Home from "./components/Home";
import TextEditor from "./components/TextEditor";
import useMyContext from "./store/useMyContext";
import { useEffect } from "react";
import { verifyAuth } from "@/authController/authController";

function App() {
  const { state, dispatch } = useMyContext();

  useEffect(() => {
    verifyAuth().then((data) => {
      if (data.errors) {
        dispatch({ type: "SET_APPSTATE", payload: "auth" });
      } else {
        dispatch({
          type: "SET_USER",
          payload: { username: data?.user?.username, email: data?.user?.email },
        });
        dispatch({ type: "SET_USER_ID", payload: data.user._id });
        dispatch({ type: "SET_APPSTATE", payload: "home" });
      }
    });
  }, [dispatch]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      {/* text Editor */}
      {state.appState === "editor" ? <TextEditor /> : null}
      <div className="w-full py-12 px-2 border-b flex flex-col justify-start items-center flex-1">
        {/* if not logged in Display this component */}
        {state.appState === "auth" ? <Auth /> : null}
        {/* if logged in Display this component */}
        {state.appState === "home" ? <Home /> : null}
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
