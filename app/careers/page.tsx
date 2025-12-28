import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CareersHero from "@/components/careers/CareersHero";
import WhyJoin from "@/components/careers/WhyJoin";
import CurrentOpenings from "@/components/careers/CurrentOpenings";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { getCareers } from "@/lib/keystatic";

export default async function CareersPage() {
    const careers = await getCareers();

    return (
        <main className="bodycolor">
            <Navbar />
            <CareersHero />
            <WhyJoin />
            <CurrentOpenings />
            <ApplicationForm careers={careers} />
            <Footer />
        </main>
    );
}
