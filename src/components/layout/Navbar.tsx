import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, Shield } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@shared/constants/navigation";
import { CallButton } from "../common/CallButton";
import { WhatsAppButton } from "../common/WhatsAppButton";
import { Drawer } from "../common/Drawer";
import { LanguageSelector } from "@shared/ui/language-selector/LanguageSelector";
import { ComparisonBar } from "@features/vehicle-comparison";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close mobile drawer when window is resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // IntersectionObserver for homepage sections
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionIds = [
      "home",
      "services",
      "fleet",
      "why-us",
      "destinations",
      "reviews",
      "faq",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    setIsDrawerOpen(false);

    if (item.type === "section") {
      e.preventDefault();
      if (location.pathname === "/") {
        const targetId = item.href.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setActiveSection(targetId);
        }
      } else {
        navigate(`/${item.href}`);
        setTimeout(() => {
          const targetId = item.href.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    } else if (item.type === "route") {
      if (location.pathname === item.href && item.href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const isLinkActive = (item: NavItem) => {
    if (item.type === "route") {
      if (item.href === "/") return location.pathname === "/";
      return location.pathname.startsWith(item.href);
    }
    return location.pathname === "/" && activeSection === item.id;
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
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
            aria-label="Benaka Tours and Travels Homepage"
          >
            <img
              src="/assets/brand/benaka_emblem_gold_transparent.png"
              alt="Benaka Emblem"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="font-accent text-2xl md:text-3xl text-[#D4AF37] leading-none group-hover:text-amber-400 transition-colors">
                Benaka
              </span>
              <span className="text-[10px] sm:text-xs tracking-[0.2em] font-extrabold uppercase text-white group-hover:text-[#D4AF37] transition-colors mt-0.5">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible only on >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item);
              if (item.type === "route") {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                      active ? "text-[#D4AF37] font-semibold" : "text-slate-300"
                    }`}
                  >
                    {item.label === "Admin" ? (
                      <span className="inline-flex items-center gap-1 text-slate-400 hover:text-[#D4AF37]">
                        <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Admin</span>
                      </span>
                    ) : (
                      item.label
                    )}
                    {active && (
                      <motion.div
                        layoutId="activeNavIndicatorNavbar"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] rounded-full"
                      />
                    )}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative text-sm font-medium transition-colors hover:text-[#D4AF37] ${
                    active ? "text-[#D4AF37] font-semibold" : "text-slate-300"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicatorNavbar"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Visible only on >= 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector compact />
            <CallButton size="sm" />
            <WhatsAppButton size="sm" label="WhatsApp" />
          </div>

          {/* Mobile Hamburger Trigger (Visible only on < 1024px) */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSelector compact />
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-2.5 rounded-xl bg-[#121620] border border-white/10 text-white hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
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
          {NAV_ITEMS.map((item) => {
            const active = isLinkActive(item);
            if (item.type === "route") {
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`text-base font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-between ${
                    active
                      ? "text-[#D4AF37] bg-amber-500/10 font-bold"
                      : "text-slate-200 hover:bg-[#1A1F2C] hover:text-[#D4AF37]"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.label === "Admin" && (
                    <Shield className="w-4 h-4 text-[#D4AF37]" />
                  )}
                </Link>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-base font-semibold py-3 px-4 rounded-xl transition-all ${
                  active
                    ? "text-[#D4AF37] bg-amber-500/10 font-bold"
                    : "text-slate-200 hover:bg-[#1A1F2C] hover:text-[#D4AF37]"
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <LanguageSelector />
            <CallButton size="md" fullWidth />
            <WhatsAppButton size="md" fullWidth />
          </div>
        </div>
      </Drawer>

      {/* Floating Comparison Bar */}
      <ComparisonBar />
    </>
  );
};
