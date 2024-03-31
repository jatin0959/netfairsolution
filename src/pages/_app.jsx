import "../styles/index.scss";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showNavbar = router.pathname == "/Dashboard";

  return (
    <>
      {showNavbar && <Navbar />} {/* Render Navbar if route is not "/dashboard" */}
      <Component {...pageProps} />
    </>
  );
}
