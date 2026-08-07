import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, Shield } from "lucide-react";
import { CallButton } from "../common/CallButton";
import { WhatsAppButton } from "../common/WhatsAppButton";
import { Drawer } from "../common/Drawer";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll
      const sections = [
        "home",
        "fleet",
        "services",
        "why-us",
        "reviews",
        "faq",
        "contact",
      ];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Fleet", href: "#fleet", id: "fleet" },
    { name: "Services", href: "#services", id: "services" },
    { name: "Why Benaka", href: "#why-us", id: "why-us" },
    { name: "Reviews", href: "#reviews", id: "reviews" },
    { name: "FAQ", href: "#faq", id: "faq" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(targetId);
      }
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0D12]/95 backdrop-blur-xl border-b border-[#D4AF37]/20 shadow-xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="font-accent text-2xl md:text-3xl text-[#D4AF37] leading-none group-hover:text-amber-400 transition-colors">
                Benaka
              </span>
              <span className="text-xs tracking-[0.2em] font-extrabold uppercase text-white group-hover:text-[#D4AF37] transition-colors">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                  activeSection === link.id
                    ? "text-[#D4AF37] font-semibold"
                    : "text-slate-300"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] rounded-full"
                  />
                )}
              </a>
            ))}

            <Link
              to="/admin"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 px-2.5 py-1 rounded-lg transition-all"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <CallButton size="sm" />
            <WhatsAppButton size="sm" label="WhatsApp" />
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2.5 rounded-xl bg-[#121620] border border-white/10 text-white hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-emerald-400 origin-left"
        />
      </header>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Navigation"
      >
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-semibold py-3 px-4 rounded-xl text-slate-200 hover:bg-[#1A1F2C] hover:text-[#D4AF37] transition-all"
            >
              {link.name}
            </a>
          ))}

          <Link
            to="/admin"
            onClick={() => setIsDrawerOpen(false)}
            className="flex items-center gap-2 text-sm font-semibold py-3 px-4 rounded-xl text-slate-300 hover:bg-[#1A1F2C] hover:text-[#D4AF37]"
          >
            <Shield className="w-4 h-4 text-[#D4AF37]" />
            <span>Secure Admin Portal</span>
          </Link>

          <div className="pt-6 flex flex-col gap-3">
            <CallButton size="md" fullWidth />
            <WhatsAppButton size="md" fullWidth />
          </div>
        </div>
      </Drawer>
    </>
  );
};
