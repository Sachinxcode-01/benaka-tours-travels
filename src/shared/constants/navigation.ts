export interface NavItem {
  label: string;
  href: string;
  type: "route" | "section";
  id: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/", type: "route", id: "home" },
  { label: "Fleet", href: "/fleet", type: "route", id: "fleet" },
  { label: "Services", href: "#services", type: "section", id: "services" },
  { label: "Why Us", href: "#why-us", type: "section", id: "why-us" },
  { label: "Destinations", href: "#destinations", type: "section", id: "destinations" },
  { label: "Reviews", href: "#reviews", type: "section", id: "reviews" },
  { label: "FAQ", href: "#faq", type: "section", id: "faq" },
  { label: "Contact", href: "/contact", type: "route", id: "contact" },
  { label: "Admin", href: "/admin", type: "route", id: "admin" },
] as const;
