"use client";

import { useEffect } from "react";
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

export default function Home() {
  useEffect(() => {
    // Handle hash navigation from other pages
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for hydration and layout
        setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHashScroll();
  }, []);

  return (
    <main>
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
    </main>
  );
}
