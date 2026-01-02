"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);
    const savedScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled past threshold
            setScrolled(currentScrollY > 50);

            // Always keep navbar visible (hamburger should be static throughout the app)
            setVisible(true);

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                        <Link href="/#services" onClick={(e) => handleNavClick(e, "/#services")}>
                            Our Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" onClick={(e) => handleNavClick(e, "/blog")}>
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link href="/#about" onClick={(e) => handleNavClick(e, "/#about")}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/careers" onClick={(e) => handleNavClick(e, "/careers")}>
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
