import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <Image
                                src="/images/footer-logo.svg"
                                alt="Posilenz Footer Logo"
                                width={150}
                                height={40}
                                className="w-auto h-auto"
                            />
                        </div>
                    </div>

                    <div className="footer-locations">
                        <div className="footer-location">
                            <h4 className="footer-location-title">Qatar</h4>
                            <p className="footer-location-info">Tel: +974 3033 1237</p>
                            <p className="footer-location-text">
                                Posilenz Technology LLC, Alofog, PB No: 1373, Doha, Qatar
                            </p>
                        </div>
                        <div className="footer-location">
                            <h4 className="footer-location-title">UAE</h4>
                            <p className="footer-location-info">Tel: +966 13 887 2603</p>
                            <p className="footer-location-text">
                                Posilenz Technology LLC, Office Number 3-109, Ginger Business
                                Centre, Al Khabeesi Showroom Building, Dubai, UAE
                            </p>
                        </div>
                        <div className="footer-location">
                            <h4 className="footer-location-title">India</h4>
                            <p className="footer-location-info">Tel: +971 4242 4069</p>
                            <p className="footer-location-text">
                                Posilenz Technology LLC, 14/465/C, Randarkara Rd,
                                Muvattupuzha, Ernakulam, Kerala, India – 686661
                            </p>
                        </div>
                        <div className="footer-location">
                            <h4 className="footer-location-title">Support</h4>
                            <a href="mailto:info@posilenz.com" className="footer-location-info">
                                info@posilenz.com
                            </a>
                            <div className="footer-social">
                                <Link
                                    href="#"
                                    className="footer-social-link"
                                    aria-label="Twitter"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </Link>
                                <Link
                                    href="#"
                                    className="footer-social-link"
                                    aria-label="LinkedIn"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="none"></div>
                    <div className="footer-legal">
                        <Link href="#" className="footer-legal-link">
                            Privacy policy
                        </Link>
                        <span className="footer-copyright">
                            {" "}
                            © 2025 All Rights Reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
