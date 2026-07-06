"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogOut, Package } from "lucide-react";
import { checkAdminSession, adminLogout } from "@/lib/admin-client";

export function AdminShell({ children, title }: { children: ReactNode; title?: string }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminSession()
      .then((session) => {
        if (!session) {
          navigate({ to: "/admin/login" });
          return;
        }
        setAdmin(session);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  async function logout() {
    await adminLogout();
    navigate({ to: "/admin/login" });
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-primary" />
            <div>
              <p className="font-display text-xl text-primary">Admin Salaicha</p>
              {title && <p className="text-xs text-muted-foreground">{title}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">{admin.email}</span>
            <Link to="/" className="text-primary hover:underline">
              Voir le site
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" /> Déconnexion
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
