import type {LucideIcon} from "lucide-react";
import {
  ArrowLeft,
  Bell,
  BookOpenCheck,
  CalendarDays,
  Check,
  ChevronRight,
  CloudCog,
  Download,
  Eye,
  FileSearch,
  FileSignature,
  FileText,
  GraduationCap,
  HandCoins,
  History,
  Info,
  Camera,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Megaphone,
  Newspaper,
  Pencil,
  Plus,
  QrCode,
  School,
  Search,
  Settings,
  ShieldCheck,
  Upload,
  UserPlus,
  Users,
  WalletCards,
  X,
} from "lucide-react";

export type IconName =
  | "dashboard"
  | "students"
  | "reportCard"
  | "finance"
  | "payment"
  | "pix"
  | "announcements"
  | "calendar"
  | "publications"
  | "contracts"
  | "notifications"
  | "staff"
  | "settings"
  | "audit"
  | "orphanRecords"
  | "backup"
  | "schoolManagement"
  | "login"
  | "logout"
  | "search"
  | "export"
  | "import"
  | "pdf"
  | "edit"
  | "view"
  | "add"
  | "back"
  | "next"
  | "check"
  | "info"
  | "shield"
  | "userAdd"
  | "menu"
  | "close"
  | "whatsapp"
  | "instagram";

const iconMap: Record<IconName, LucideIcon> = {
  dashboard: LayoutDashboard,
  students: Users,
  reportCard: BookOpenCheck,
  finance: WalletCards,
  payment: HandCoins,
  pix: QrCode,
  announcements: Megaphone,
  calendar: CalendarDays,
  publications: Newspaper,
  contracts: FileSignature,
  notifications: Bell,
  staff: GraduationCap,
  settings: Settings,
  audit: History,
  orphanRecords: FileSearch,
  backup: CloudCog,
  schoolManagement: School,
  login: LogIn,
  logout: LogOut,
  search: Search,
  export: Download,
  import: Upload,
  pdf: FileText,
  edit: Pencil,
  view: Eye,
  add: Plus,
  back: ArrowLeft,
  next: ChevronRight,
  check: Check,
  info: Info,
  shield: ShieldCheck,
  userAdd: UserPlus,
  menu: Menu,
  close: X,
  whatsapp: MessageCircle,
  instagram: Camera,
};

type AppIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function AppIcon({name, size = 20, className = "", strokeWidth = 2}: AppIconProps) {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" className={`appIcon ${className}`.trim()} size={size} strokeWidth={strokeWidth}/>;
}
