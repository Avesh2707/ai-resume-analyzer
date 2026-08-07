import { FileText, LayoutGrid, Settings, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
}

/**
 * Static sidebar navigation items. These are UI placeholders only — no
 * routes or logic are attached. Real destinations arrive with the dashboard
 * in a future phase.
 */
export const sidebarNav: SidebarNavItem[] = [
  { label: 'Overview', icon: LayoutGrid },
  { label: 'Resumes', icon: FileText },
  { label: 'Reports', icon: SlidersHorizontal },
  { label: 'Settings', icon: Settings },
];
