
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Image, 
  Newspaper, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  BarChart2,
  UserCheck,
  UserX,
  Shield,
  MessageSquare,
  Settings,
  User,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar = ({ open, setOpen, activeTab, setActiveTab }: AdminSidebarProps) => {
  const navigationItems = [
    {
      group: "Overview",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "analytics", label: "Analytics", icon: BarChart2 },
      ],
    },
    {
      group: "User Management",
      items: [
        { id: "all-users", label: "All Users", icon: Users },
        { id: "user-verification", label: "Pending Users", icon: UserCheck },
        { id: "users-rejected", label: "Rejected Users", icon: UserX },
        { id: "users-blocked", label: "Blocked Users", icon: Shield },
      ],
    },
    {
      group: "Communication",
      items: [
        { id: "messages", label: "Messaging", icon: MessageSquare },
        { id: "global-messages", label: "Contact Messages", icon: Mail },
      ],
    },
    {
      group: "Content",
      items: [
        { id: "gallery", label: "Gallery", icon: Image },
        { id: "news", label: "News", icon: Newspaper },
        { id: "events", label: "Events", icon: Calendar },
      ],
    },
    {
      group: "Admin",
      items: [
        { id: "settings", label: "Account Settings", icon: Settings },
      ],
    },
  ];

  return (
    <div
      className={cn(
        "h-full bg-slate-900 text-white fixed left-0 top-16 z-10 transition-all duration-300 dark:bg-slate-950",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="absolute -right-3 top-20">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-full bg-slate-900 p-1 text-white shadow-md dark:bg-slate-950"
        >
          {open ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex flex-col space-y-6 p-4 h-full overflow-y-auto">
        {navigationItems.map((group) => (
          <div key={group.group} className="space-y-2">
            {open && (
              <h3 className="text-xs uppercase text-slate-400 font-medium tracking-wider px-2">
                {group.group}
              </h3>
            )}
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "flex items-center w-full px-2 py-2 rounded-md transition-colors",
                      activeTab === item.id
                        ? "bg-slate-700 text-white"
                        : "hover:bg-slate-800 text-slate-300"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", !open && "mx-auto")} />
                    {open && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
