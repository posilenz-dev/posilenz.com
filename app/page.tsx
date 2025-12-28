import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import ServicesIntro from "@/components/landing/ServicesIntro";
import ServicesDetails from "@/components/landing/ServicesDetails";
import WhyPosilenz from "@/components/landing/WhyPosilenz";
import Team from "@/components/landing/Team";
import Insights from "@/components/landing/Insights";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import HomeClient from "@/components/landing/HomeClient";

export default function Home() {
  return (
    <HomeClient>
      <Navbar />
      <Hero />
      <About />
      <ServicesIntro />
      <ServicesDetails />
      <WhyPosilenz />
      <Team />
      <Insights />
      <Contact />
      <Footer />
    </HomeClient>
  );
}
