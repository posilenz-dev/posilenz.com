"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
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

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
                        <Link href="/#services" onClick={closeMenu}>
                            Our Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" onClick={closeMenu}>
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link href="/#about" onClick={closeMenu}>
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link href="/careers" onClick={closeMenu}>
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link href="/#contact" onClick={closeMenu}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
