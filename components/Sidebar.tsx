"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FiLayout, 
  FiPlusCircle, 
  FiBook
} from "react-icons/fi";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/", icon: FiLayout },
  { label: "Create Agent", href: "/agents", icon: FiPlusCircle },
  { label: "Billing", href: "/billings", icon: FiBook },
];

export const AgentDashboardSidebar = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminFlag = localStorage.getItem("is_admin");
      setIsAdmin(adminFlag === "true");
    }
  }, []);

  return (
    <aside className="hidden md:flex w-60 flex-col items-start bg-indigo-100/50 shadow-md p-5 ">

      <div className="w-full">
        <h2 className="text-[11px] tracking-wide text-indigo-500 font-semibold mb-3">Navigation</h2>
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <div className={`flex items-center gap-3 mb-2 px-3 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
              pathname === item.href 
                ? "bg-indigo-100 text-indigo-700" 
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            }`}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>

    </aside>
  );
};