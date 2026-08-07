export const ROUTES = {
  HOME: "/",
  FLEET: "/fleet",
  VEHICLE_DETAILS: (slug: string) => `/fleet/${slug}`,
  CONTACT: "/contact",
  PRIVACY: "/privacy",
  TERMS: "/terms",
  ADMIN: "/admin",
} as const;
