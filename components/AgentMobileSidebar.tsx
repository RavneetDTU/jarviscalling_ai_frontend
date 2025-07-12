"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

import { 
  FiLayout, 
  FiPlusCircle, 
  FiUsers
} from "react-icons/fi";

const allNavItems = [
  { label: "Dashboard", href: "/", icon: FiLayout, group: "MAIN" },
  { label: "Create Agent", href: "/agents", icon: FiPlusCircle, group: "MAIN" },
  { label: "Billing", href: "/billings", icon: FiUsers, group: "MAIN" },
];

export const AgentMobileSidebar = () => {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            setUserName(user.displayName || "User");
            setEmail(user.email || "user@gmail.com");
        } else {
            setUserName("Guest");
        }
    }, [user]);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminFlag = localStorage.getItem("is_admin");
      setIsAdmin(adminFlag === "true");
    }
  }, []);

  // Filter navItems based on admin status
  const navItems = allNavItems.filter(item => 
    item.group !== "ADMIN" || isAdmin
  );

  const groupedNavItems = navItems.reduce(
    (acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = []
      }
      acc[item.group].push(item)
      return acc
    },
    {} as Record<string, typeof allNavItems>,
  )

  return (
    <div className="h-full w-full overflow-y-auto bg-indigo-100/50 shadow-md z-50">
      {Object.entries(groupedNavItems).map(([group, items]) => (
        <div key={group} className="mb-6">
          <h2 className="text-xs uppercase tracking-wider text-indigo-500 mb-3 px-4 font-medium">
            {group === "MAIN" ? "Navigation" : "Admin"}
          </h2>
          <div className="space-y-1 px-2">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
      
      <div className="mt-6 px-4">
        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{userName?.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};