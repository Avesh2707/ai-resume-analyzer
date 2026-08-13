import { FileText, LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

export const sidebarNav: SidebarNavItem[] = [
  { label: 'Overview', icon: LayoutGrid, href: '/dashboard' },
  { label: 'Resumes', icon: FileText, href: '/dashboard/resumes' },
];
