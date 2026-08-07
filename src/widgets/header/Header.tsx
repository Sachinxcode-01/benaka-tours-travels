import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { TopBar } from "../top-bar";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { useScrollDirection } from "@shared/hooks/useScrollDirection";
import { Button } from "@shared/ui/button";
import { IconButton } from "@shared/ui/icon-button";
import { Drawer } from "@shared/ui/drawer";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollDir = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((currentScrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Fleet", href: "#fleet" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Destinations", href: "#destinations" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={`sticky top-0 z-40 transition-transform duration-300 ${
        scrollDir === "down" && isScrolled
          ? "-translate-y-full"
          : "translate-y-0"
      }`}
    >
      {/* Top Info Bar */}
      <TopBar />

      {/* Scroll Progress Bar */}
      <div className="h-[2px] w-full bg-neutral-900 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar */}
      <header
        className={`w-full border-b transition-all duration-300 ${
          isScrolled
            ? "border-amber-500/20 bg-neutral-950/95 shadow-xl backdrop-blur-md py-2.5"
            : "border-transparent bg-neutral-950/40 backdrop-blur-sm py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-brand-accent text-2xl sm:text-3xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
              Benaka
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-slate-100 uppercase">
              Tours & Travels
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }
                }}
                className="text-slate-300 hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/admin"
              className="text-slate-400 hover:text-amber-400 transition-colors py-1"
            >
              Admin
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a href={createTelUrl()} className="inline-flex">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Phone className="h-3.5 w-3.5" />}
              >
                Call Now
              </Button>
            </a>
            <a
              href={createWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="primary"
                size="sm"
                leftIcon={<MessageCircle className="h-3.5 w-3.5" />}
              >
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <IconButton
              icon={
                isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )
              }
              aria-label="Toggle Navigation Menu"
              variant="ghost"
              size="md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-400"
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Navigation Menu"
        position="right"
      >
        <div className="flex flex-col space-y-6 pt-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNavClick(link.href);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="text-lg font-medium text-slate-200 hover:text-amber-400 transition-colors border-b border-neutral-800 pb-2"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-slate-400 hover:text-amber-400 transition-colors border-b border-neutral-800 pb-2"
            >
              Admin Portal
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-4">
            <a href={createTelUrl()}>
              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Phone className="h-4 w-4" />}
              >
                Call Directly
              </Button>
            </a>
            <a
              href={createWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="primary"
                size="md"
                fullWidth
                leftIcon={<MessageCircle className="h-4 w-4" />}
              >
                Book on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
