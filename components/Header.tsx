"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type UserRole = "admin" | "student" | null;

type NavItem = {
  label: string;
  href: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingRole, setLoadingRole] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadUserRole() {
      setLoadingRole(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setIsLoggedIn(false);
        setRole(null);
        setLoadingRole(false);
        return;
      }

      setIsLoggedIn(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!mounted) return;

      setRole((profile?.role as UserRole) ?? "student");
      setLoadingRole(false);
    }

    loadUserRole();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUserRole();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const materialsHref = role === "admin" ? "/admin/materials" : "/materials";
  const dashboardHref = role === "admin" ? "/admin" : "/dashboard";

  const navItems: NavItem[] = [
    { label: "Início", href: "/" },
    { label: "Sobre", href: "/about" },
    { label: "Materiais", href: materialsHref },
    { label: "Agendamento", href: "/booking" },
    { label: "Contato", href: "/contact" },
  ];

  const showAdminLink = role === "admin";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src="/logo-kaue.png"
              alt="Professor Kaue Ribeiro"
              fill
              className="object-contain p-1.5"
              sizes="44px"
              priority
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight text-slate-950">
              Professor Kaue Ribeiro
            </p>
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700">
              Matemática e Física
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {showAdminLink ? (
            <Link
              href="/admin"
              className={`ml-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(pathname, "/admin")
                  ? "bg-amber-400 text-slate-950"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              Admin
            </Link>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <Link
              href={dashboardHref}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {loadingRole
                ? "Carregando..."
                : role === "admin"
                ? "Painel admin"
                : "Dashboard"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-900 transition hover:bg-slate-100 lg:hidden"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 md:px-10 lg:px-12">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);

                return (
                  <Link
                    key={`${item.label}-${item.href}-mobile`}
                    href={item.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                );
              })}

              {showAdminLink ? (
                <Link
                  href="/admin"
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(pathname, "/admin")
                      ? "bg-amber-400 text-slate-950"
                      : "border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                  }`}
                >
                  <span>Admin</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4">
              {isLoggedIn ? (
                <Link
                  href={dashboardHref}
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {loadingRole
                    ? "Carregando..."
                    : role === "admin"
                    ? "Painel admin"
                    : "Dashboard"}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}