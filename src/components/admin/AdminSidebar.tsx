
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  UserX, 
  Image, 
  Newspaper, 
  Calendar, 
  ChevronRight, 
  ChevronLeft, 
  MessageSquare, 
  Shield,
  PieChart,
  Settings,
  User,
  LogOut,
  Award,
  Home,
  FileText,
  Briefcase
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  open, 
  setOpen, 
  activeTab, 
  setActiveTab 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const sidebarSections: SidebarSection[] = [
    {
      title: "Overview",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
        {
          id: "homepage",
          label: "View Homepage",
          icon: <Home className="h-5 w-5" />,
          onClick: () => handleNavigate('/')
        }
      ]
    },
    {
      title: "User Management",
      items: [
        {
          id: "all-users",
          label: "All Users",
          icon: <Users className="h-5 w-5" />,
        },
        {
          id: "user-verification",
          label: "Pending Verification",
          icon: <UserCheck className="h-5 w-5" />,
        },
        {
          id: "users-blocked",
          label: "Blocked Users",
          icon: <Shield className="h-5 w-5" />,
        },
        {
          id: "users-rejected",
          label: "Rejected Users",
          icon: <UserX className="h-5 w-5" />,
        }
      ]
    },
    {
      title: "Content Management",
      items: [
        {
          id: "carousel",
          label: "Homepage Carousel",
          icon: <Image className="h-5 w-5" />,
        },
        {
          id: "principal",
          label: "Principal's Desk",
          icon: <User className="h-5 w-5" />,
        },
        {
          id: "alumni-spotlight",
          label: "Alumni Spotlight",
          icon: <Award className="h-5 w-5" />,
        },
        {
          id: "gallery",
          label: "Photo Gallery",
          icon: <Image className="h-5 w-5" />,
        },
        {
          id: "news",
          label: "News Articles",
          icon: <Newspaper className="h-5 w-5" />,
        },
        {
          id: "events",
          label: "Events",
          icon: <Calendar className="h-5 w-5" />,
        }
      ]
    },
    {
      title: "Moderation",
      items: [
        {
          id: "posts",
          label: "Posts Moderation",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          id: "jobs",
          label: "Jobs Moderation",
          icon: <Briefcase className="h-5 w-5" />,
        }
      ]
    },
    {
      title: "Communication",
      items: [
        {
          id: "messages",
          label: "Direct Messages",
          icon: <MessageSquare className="h-5 w-5" />,
        },
        {
          id: "global-messages",
          label: "Contact Messages",
          icon: <MessageSquare className="h-5 w-5" />,
        }
      ]
    },
    {
      title: "System",
      items: [
        {
          id: "analytics",
          label: "Analytics",
          icon: <PieChart className="h-5 w-5" />,
        },
        {
          id: "settings",
          label: "Account Settings",
          icon: <Settings className="h-5 w-5" />,
        },
        {
          id: "logout",
          label: "Logout",
          icon: <LogOut className="h-5 w-5" />,
          onClick: handleLogout
        }
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 bg-white dark:bg-slate-900 border-r dark:border-slate-800 z-30 transition-all duration-300",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center", !open && "justify-center w-full")}>
            <Shield className="h-8 w-8 text-primary" />
            {open && <span className="ml-2 font-bold text-xl">Admin Panel</span>}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setOpen(!open)}
            className={cn("", !open && "hidden")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className={cn("", open && "hidden")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <Separator />
        
        <div className="overflow-y-auto flex-1 py-4">
          {sidebarSections.map((section, index) => (
            <div key={index} className={cn("mb-6", !open && "px-2")}>
              {open && (
                <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      !open && "px-2 justify-center"
                    )}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                  >
                    {item.icon}
                    {open && <span className="ml-2">{item.label}</span>}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
