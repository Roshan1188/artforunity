import { useState } from "react";
import useReveal from "./hooks/useReveal";
import useLenis from "./hooks/useLenis";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Partners from "./components/Partners";
import Categories from "./components/Categories";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useReveal();
  useLenis();

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Cursor />

      <div
        className={`transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main id="main">
          <Hero entered={loaded} />
          <Marquee />
          <About />
          <Partners />
          <Categories />
          <Process />
          <Gallery />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <ScrollProgress />
      </div>
    </>
  );
}
