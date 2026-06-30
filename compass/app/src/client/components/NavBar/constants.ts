import type { NavigationItem } from "./NavBar";

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Assess a Program", to: "/assess" },
  { name: "Reports", to: "/reports" },
  { name: "Insights", to: "/insights" },
  { name: "Developers", to: "/developers" },
] as const;

export const demoNavigationitems: NavigationItem[] = [
  { name: "Assess", to: "/assess" },
  { name: "Reports", to: "/reports" },
  { name: "Insights", to: "/insights" },
  { name: "Developers", to: "/developers" },
] as const;
