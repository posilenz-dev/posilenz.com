import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoin from "@/components/careers/WhyJoin";
import CurrentOpenings from "@/components/careers/CurrentOpenings";
import ApplicationForm from "@/components/careers/ApplicationForm";

export default function CareersPage() {
    return (
        <main className="bodycolor">
            <Navbar />
            <CareersHero />
            <WhyJoin />
            <CurrentOpenings />
            <ApplicationForm />
            <Footer />
        </main>
    );
}
