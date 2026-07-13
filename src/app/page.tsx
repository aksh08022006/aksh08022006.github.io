import Motion from "@/components/Motion";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Activity from "@/components/Activity";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Cursor />
      <Motion>
        <Header />
        <main>
          <Hero />
          <Work />
          <Activity />
          <About />
          <Contact />
        </main>
      </Motion>
    </>
  );
}
