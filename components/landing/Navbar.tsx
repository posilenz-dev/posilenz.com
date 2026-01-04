"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [activeSection, setActiveSection] = useState<string>("");
    const lastScrollY = useRef(0);
    const savedScrollY = useRef(0);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled past threshold
            setScrolled(currentScrollY > 50);

            // Always keep navbar visible (hamburger should be static throughout the app)
            setVisible(true);

            // Only track active section on home page and desktop
            if ((pathname === "/" || pathname === "") && window.innerWidth > 768) {
                const sections = ["services", "insights", "about", "contact"];
                const navbarHeight = 100;

                for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const rect = element.getBoundingClientRect();
                        // Check if section is in viewport (with some offset for navbar)
                        if (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) {
                            setActiveSection(sectionId);
                            break;
                        }
                    }
                }

                // If scrolled to top, clear active section
                if (currentScrollY < 200) {
                    setActiveSection("");
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Run on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, [pathname]);

    const toggleMenu = () => {
        if (!isMenuOpen) {
            // Opening menu - save current scroll position
            savedScrollY.current = window.scrollY;
            document.body.style.top = `-${savedScrollY.current}px`;
            document.body.classList.add("menu-open");
        } else {
            // Closing menu - restore scroll position
            document.body.classList.remove("menu-open");
            document.body.style.top = "";
            window.scrollTo(0, savedScrollY.current);
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove("menu-open");
        document.body.style.top = "";
        window.scrollTo(0, savedScrollY.current);
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Close menu and restore body state
        setIsMenuOpen(false);
        document.body.classList.remove("menu-open");
        document.body.style.top = "";

        // For hash links on the home page
        if (href.startsWith("/#")) {
            const targetId = href.replace("/#", "");

            // Check if we're on the home page
            const isHomePage = window.location.pathname === "/" || window.location.pathname === "";

            if (isHomePage) {
                // On home page - scroll to element
                e.preventDefault();
                // First restore scroll position, then scroll to target
                window.scrollTo(0, savedScrollY.current);

                // Small delay to ensure body is restored before scrolling
                setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        window.history.replaceState(null, "", href);
                        // Use scrollTo with offset for better positioning on mobile
                        const isMobile = window.innerWidth <= 768;
                        const navbarHeight = 70;
                        const elementRect = element.getBoundingClientRect();
                        const absoluteElementTop = elementRect.top + window.pageYOffset;
                        // Add extra offset for about section on mobile to skip the animated background
                        const extraOffset = (isMobile && targetId === "about") ? 480 : 0;
                        const offsetPosition = absoluteElementTop - navbarHeight + extraOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }, 50);
            }
            // If not on home page, let the Link component handle navigation to /#section
        }
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""} ${!visible ? "navbar-hidden" : ""}`}>
            <div className="navbar-container">
                <Link href="/#hero" className="logo" onClick={closeMenu}>
                    <Image
                        src="/images/logo.svg"
                        alt="Posilenz"
                        width={150}
                        height={40}
                        className="w-auto h-auto"
                        priority
                    />
                </Link>

                <button
                    className={`hamburger ${isMenuOpen ? "active" : ""}`}
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                    <li>
                        <Link
                            href="/#services"
                            onClick={(e) => handleNavClick(e, "/#services")}
                            className={activeSection === "services" ? "active" : ""}
                        >
                            Our Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blog"
                            onClick={(e) => handleNavClick(e, "/blog")}
                            className={pathname.startsWith("/blog") || activeSection === "insights" ? "active" : ""}
                        >
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#about"
                            onClick={(e) => handleNavClick(e, "/#about")}
                            className={activeSection === "about" ? "active" : ""}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/careers"
                            onClick={(e) => handleNavClick(e, "/careers")}
                            className={pathname === "/careers" ? "active" : ""}
                        >
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/#contact"
                            onClick={(e) => handleNavClick(e, "/#contact")}
                            className={activeSection === "contact" ? "active" : ""}
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
