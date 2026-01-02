"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if scrolled past threshold
            setScrolled(currentScrollY > 50);

            // Show/hide navbar based on scroll direction (only on mobile)
            if (window.innerWidth <= 768) {
                // Always show at top of page
                if (currentScrollY < 100) {
                    setVisible(true);
                } else if (currentScrollY < lastScrollY.current) {
                    // Scrolling up - show navbar
                    setVisible(true);
                } else if (currentScrollY > lastScrollY.current + 10) {
                    // Scrolling down (with threshold) - hide navbar
                    setVisible(false);
                }
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle("menu-open", !isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove("menu-open");
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Close menu with animation before navigation
        setIsMenuOpen(false);
        setTimeout(() => {
            document.body.classList.remove("menu-open");
        }, 300);

        // For hash links on the same page, prevent adding to browser history
        if (href.startsWith("/#")) {
            e.preventDefault();
            const targetId = href.replace("/#", "");
            const element = document.getElementById(targetId);
            if (element) {
                // Use replaceState instead of pushState to avoid polluting history
                window.history.replaceState(null, "", href);
                element.scrollIntoView({ behavior: "smooth" });
            }
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
