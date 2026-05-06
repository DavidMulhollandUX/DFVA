import type { NavigationItem } from "./NavBar";

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Features", to: "/#features" },
  { name: "Assess a Program", to: "/assess" },
  { name: "Reports", to: "/reports" },
] as const;

export const demoNavigationitems: NavigationItem[] = [
  { name: "Assess", to: "/assess" },
  { name: "Reports", to: "/reports" },
] as const;
