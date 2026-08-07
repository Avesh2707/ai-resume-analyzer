export interface NavItem {
  label: string;
  href: string;
}

/** Primary top-nav links, shared between the desktop Navbar and mobile menu. */
export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
];
