"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Package, Settings, UtensilsCrossed, LogOut, Bell } from "lucide-react";
import Image from "next/image";
import { STORE_SETTINGS } from "@/lib/data";
import { Button } from "../ui/button";

const menuItems = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/notifications", label: "الإشعارات", icon: Bell },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="hidden md:block">
      <SidebarHeader className="h-14 items-center justify-center border-b">
         <div className="flex items-center gap-2 [&>span]:hidden group-data-[state=expanded]:[&>span]:inline">
           <Image src="/logo.svg" alt="Logo" width={24} height={24} />
           <span className="font-bold font-headline">{STORE_SETTINGS.name}</span>
         </div>
         <SidebarTrigger className="absolute right-0 top-3 group-data-[state=expanded]:-right-2.5" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip={{children: 'عرض المتجر'}}>
                    <Link href="/" target="_blank">
                        <UtensilsCrossed />
                        <span>عرض المتجر</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{children: 'تسجيل الخروج'}}>
                    <Link href="/">
                        <LogOut />
                        <span>تسجيل الخروج</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
