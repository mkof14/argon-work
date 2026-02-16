"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSettings } from "./AppProviders";

type SessionUser = {
  email: string;
  name?: string;
  provider: "magic_link" | "google";
};

export function AuthControls() {
  const { localizePath } = useAppSettings();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) {
          setUser(null);
          return;
        }
        const payload = (await response.json()) as { user?: SessionUser };
        setUser(payload.user ?? null);
      })
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = localizePath("/");
  }

  if (!ready) {
    return null;
  }

  if (!user) {
    return (
      <Link className="btn btn-secondary sign-unified-btn" href={localizePath("/auth/login?mode=signin")}>
        Sign In/Up
      </Link>
    );
  }

  return (
    <div className="auth-chip-wrap">
      <Link className="auth-chip" href={localizePath("/dashboard")} title={user.email}>
        {user.name || user.email}
      </Link>
      <button className="btn btn-secondary" type="button" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
