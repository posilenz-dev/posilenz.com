import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white text-center px-4">
                <h1 className="text-9xl font-bold text-[#0047FF] mb-4 font-[family-name:var(--font-heading)]">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#0A1630] mb-6 font-[family-name:var(--font-heading)]">
                    Page Not Found
                </h2>
                <p className="text-[#666] text-lg max-w-md mb-8">
                    The page you are looking for might have been removed, had its name
                    changed, or is temporarily unavailable.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-[#0047FF] rounded-full hover:bg-[#0038CC] transition-colors duration-300"
                >
                    Back to Home
                </Link>
            </div>
            <Footer />
        </>
    );
}
