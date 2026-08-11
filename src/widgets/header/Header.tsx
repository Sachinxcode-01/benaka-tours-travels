import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, Shield } from "lucide-react";
import { TopBar } from "../top-bar";
import { NAV_ITEMS, type NavItem } from "@shared/constants/navigation";
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
  const [activeSection, setActiveSection] = useState<string>("home");

  const location = useLocation();
  const navigate = useNavigate();
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

  // Auto-close mobile drawer when window is resized to desktop width (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // IntersectionObserver for active section highlighting on home page
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Cross-page or local smooth scroll navigation handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    item: NavItem,
  ) => {
    setIsMobileMenuOpen(false);

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
              <span className="font-brand-accent text-2xl sm:text-3xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors leading-none">
                Benaka
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-[0.2em] text-slate-100 uppercase mt-0.5">
                Tours & Travels
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (Visible only on >= 1024px) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold uppercase tracking-wider">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item);
              if (item.type === "route") {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`py-1 relative transition-colors ${
                      active
                        ? "text-[#D4AF37] font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#D4AF37]"
                        : "text-slate-300 hover:text-amber-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full"
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
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`py-1 relative transition-colors ${
                    active
                      ? "text-[#D4AF37] font-bold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#D4AF37]"
                      : "text-slate-300 hover:text-amber-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs (Visible only on >= 1024px) */}
          <div className="hidden lg:flex items-center gap-2.5">
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

          {/* Mobile Menu Trigger (Visible only on < 1024px) */}
          <div className="flex lg:hidden items-center">
            <IconButton
              icon={
                isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )
              }
              aria-label={
                isMobileMenuOpen
                  ? "Close Navigation Menu"
                  : "Open Navigation Menu"
              }
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
        <div className="flex flex-col space-y-6 pt-2">
          <div className="flex items-center justify-center pb-4 border-b border-neutral-800">
            <img
              src="/assets/brand/benaka_stacked_gold_transparent.png"
              alt="Benaka Tours & Travels"
              className="h-16 w-auto object-contain"
            />
          </div>
          <nav className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => {
              const active = isLinkActive(item);
              if (item.type === "route") {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`text-base font-semibold py-2.5 px-3 rounded-xl border-b border-neutral-800/60 transition-all flex items-center justify-between ${
                      active
                        ? "text-[#D4AF37] bg-amber-500/10 font-bold"
                        : "text-slate-200 hover:text-amber-400 hover:bg-neutral-900"
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
                  className={`text-base font-semibold py-2.5 px-3 rounded-xl border-b border-neutral-800/60 transition-all ${
                    active
                      ? "text-[#D4AF37] bg-amber-500/10 font-bold"
                      : "text-slate-200 hover:text-amber-400 hover:bg-neutral-900"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            <a href={createTelUrl()}>
              <Button
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<Phone className="h-4 w-4" />}
              >
                Call Directly (+91 63624 16120)
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
