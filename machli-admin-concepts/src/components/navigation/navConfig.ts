import {
  Bell,
  ClipboardCheck,
  History,
  Users,
  ShieldAlert,
  Waves,
  LifeBuoy,
  Landmark,
  Anchor,
  Map,
  MapPinned,
  Briefcase,
  Settings,
  LayoutDashboard,
  Smartphone,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string; // relative to option base, e.g. '' for dashboard root
  icon: LucideIcon;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', path: '', icon: LayoutDashboard }],
  },
  {
    label: 'Communication',
    items: [
      { label: 'Manual Notifications', path: 'manual-notifications', icon: Bell },
      { label: 'INCOIS Verification', path: 'incois-verification', icon: ClipboardCheck },
      { label: 'Notification History', path: 'notification-history', icon: History },
    ],
  },
  {
    label: 'Users',
    items: [{ label: 'User Management', path: 'users', icon: Users }],
  },
  {
    label: 'Marine & Safety',
    items: [
      { label: 'Alerts & Warnings', path: 'alerts-warnings', icon: ShieldAlert },
      { label: 'Marine Information', path: 'marine-information', icon: Waves },
      { label: 'Emergency & Helplines', path: 'emergency-helplines', icon: LifeBuoy },
    ],
  },
  {
    label: 'Information',
    items: [{ label: 'Government Schemes', path: 'government-schemes', icon: Landmark }],
  },
  {
    label: 'Locations',
    items: [{ label: 'Landing Centres / Nearby Ports', path: 'landing-centres', icon: Anchor }],
  },
  {
    label: 'Reference Data',
    items: [
      { label: 'States & Districts', path: 'reference-data/states-districts', icon: Map },
      { label: 'Sub-Districts & Villages', path: 'reference-data/sub-districts-villages', icon: MapPinned },
      { label: 'Occupations', path: 'reference-data/occupations', icon: Briefcase },
    ],
  },
  {
    label: 'App & Feedback',
    items: [
      { label: 'Play Store Overview', path: 'play-store', icon: Smartphone },
      { label: 'User Feedback', path: 'user-feedback', icon: MessageSquare },
    ],
  },
  {
    label: 'System',
    items: [{ label: 'Admin Access / Settings', path: 'settings', icon: Settings }],
  },
];

export const optionMeta: Record<string, { title: string; short: string }> = {
  'option-1': { title: 'Option 01 · Operations Focused', short: 'Option 01' },
  'option-2': { title: 'Option 02 · Coastal Intelligence', short: 'Option 02' },
  'option-3': { title: 'Option 03 · Executive + Operations', short: 'Option 03' },
};
