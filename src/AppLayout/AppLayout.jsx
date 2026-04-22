import { useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import LoaderAnimation from "./Loader/LoaderAnimation";
import Nav from "../Pages/App/Components/Nav";
import Footer from "../Pages/App/Components/Footer";
import CustomCursor from "../Pages/App/Components/CursorEffect";

const AppLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImage, setPreloadedImage] = useState(null);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    if (location.state && location.state.action === "loading") {
      setAnimation("");
      setIsLoading(true);
    }

    // Stop loading after 3 seconds
    const timer = setTimeout(() => setIsLoading(false), 3000);

    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return (
    <>
      <main
        style={{
          overflowY: isLoading ? "hidden" : "auto",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
        className={animation}
      >
        {isLoading && <LoaderAnimation />}
        {!isLoading && (
          <>
            <Nav />
            <CustomCursor />
            <Outlet setIsLoading={setIsLoading} />
            <Footer />
          </>
        )}
      </main>
    </>
  );
};

export default AppLayout;
