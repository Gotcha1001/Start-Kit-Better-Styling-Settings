"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import {
  BookOpen,
  Gamepad2,
  Home,
  Play,
  Save,
  Trash2,
  Users,
  Trophy,
  Settings,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  href: string;
  label: string;
  icon: typeof Home;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home", icon: Home },

  { href: "/settings", label: "Settings", icon: Settings },
];

const CUT =
  "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))";

function GroupLabel({ children }: { children: string }) {
  return (
    <SidebarGroupLabel className="font-mono text-[10px] uppercase tracking-[0.3em] text-fuchsia-400/90">
      {` ${children}`}
    </SidebarGroupLabel>
  );
}

function EmptyNote({ children }: { children: string }) {
  return (
    <p className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
      {children}
    </p>
  );
}

export function AppSidebar() {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  if (!isSignedIn) return null;

  const closeOnMobile = (): void => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarHeader className="relative overflow-hidden border-b border-cyan-400/20 p-0">
        <div aria-hidden className="cyber-noise" />
        <div aria-hidden className="cyber-scanlines" />
        <div aria-hidden className="cyber-beam" />
        <div className="relative z-10 flex items-center gap-3 px-4 py-4">
          <span className="text-3xl drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]">
            🏎️
          </span>
          <div className="group">
            <p className="text-sm font-black uppercase leading-tight tracking-wide">
              <span
                data-text="Jones"
                className="cyber-glitch cyber-flicker text-cyan-300"
                style={{ textShadow: "0 0 8px currentColor" }}
              >
                Jones
              </span>{" "}
              <span
                data-text="Fast Lane"
                className="cyber-glitch cyber-flicker-slow text-fuchsia-400"
                style={{ textShadow: "0 0 8px currentColor" }}
              >
                Fast Lane
              </span>
            </p>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
              <span className="cyber-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Online multiplayer
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <GroupLabel>Play</GroupLabel>
          <SidebarMenu>
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === href}
                  className="cyber-nav"
                >
                  <Link href={href} onClick={closeOnMobile}>
                    <Icon size={16} />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu></SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu></SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {user && (
          <div
            style={{ clipPath: CUT }}
            className="relative flex items-center gap-3 border border-fuchsia-400/40 bg-black/60 px-3 py-2"
          >
            <div aria-hidden className="cyber-scanlines" />
            <div className="relative rounded-full p-0.5 shadow-[0_0_12px_rgba(232,121,249,0.7)] ring-2 ring-fuchsia-400/80">
              <span className="cyber-dot absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border border-black bg-cyan-400" />
            </div>
            <div className="relative min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-wide text-white">
                {user.fullName ?? user.username}
              </p>
              <p className="truncate font-mono text-[10px] text-cyan-300/70">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
