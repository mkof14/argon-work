"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SessionState =
  | { loading: true; user: null }
  | { loading: false; user: null }
  | { loading: false; user: { name: string; email: string; role?: string; avatarDataUrl?: string } };

export function AuthControls() {
  const [session, setSession] = useState<SessionState>({ loading: true, user: null });

  async function loadSession() {
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    if (!response.ok) {
      setSession({ loading: false, user: null });
      return;
    }

    const payload = await response.json();
    let nextUser = payload.user;
    if (nextUser && !nextUser.avatarDataUrl) {
      const profileResp = await fetch("/api/profile", { cache: "no-store" });
      if (profileResp.ok) {
        const profilePayload = await profileResp.json();
        if (profilePayload?.profile?.avatarDataUrl) {
          nextUser = { ...nextUser, avatarDataUrl: profilePayload.profile.avatarDataUrl };
        }
      }
    }
    setSession({ loading: false, user: nextUser });
  }

  useEffect(() => {
    loadSession();
    const onProfileUpdated = () => {
      loadSession();
    };
    window.addEventListener("agron-profile-updated", onProfileUpdated);
    return () => {
      window.removeEventListener("agron-profile-updated", onProfileUpdated);
    };
  }, []);

  if (session.loading) {
    return <span className="auth-pill">Checking session...</span>;
  }

  if (!session.user) {
    return (
      <div className="auth-stack">
        <Link href="/auth/login" className="btn signinup-btn">Sign In/Up</Link>
      </div>
    );
  }

  return (
    <div className="auth-stack">
      <details className="user-menu">
        <summary className="user-menu-trigger">
          <span className="user-avatar" aria-hidden="true">
            {session.user.avatarDataUrl ? (
              <img src={session.user.avatarDataUrl} alt={session.user.name} className="user-avatar-image" />
            ) : (
              session.user.name.slice(0, 1).toUpperCase()
            )}
          </span>
          <span className="user-name">{session.user.name}</span>
        </summary>
        <div className="user-menu-panel">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/profile?tab=resume">Resume</Link>
          <Link href="/profile?tab=reviews">My Reviews</Link>
          <Link href="/profile?tab=settings">Settings</Link>
          <Link href="/messages">Messages</Link>
          {["admin", "super_admin", "support_admin", "finance_admin", "marketing_admin", "moderator"].includes(session.user.role ?? "") ? (
            <Link href="/admin">Admin Panel</Link>
          ) : null}
        </div>
      </details>
      <button
        type="button"
        className="btn ghost"
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          setSession({ loading: false, user: null });
          window.location.href = "/";
        }}
      >
        Log out
      </button>
    </div>
  );
}
