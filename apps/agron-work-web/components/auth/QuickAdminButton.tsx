"use client";

export function QuickAdminButton() {
  return (
    <button
      type="button"
      className="btn solid"
      onClick={async () => {
        const response = await fetch("/api/auth/quick-admin", { method: "POST" });
        if (response.ok) {
          window.location.href = "/admin";
          return;
        }
        window.location.href = "/auth/login";
      }}
    >
      Quick Admin Access
    </button>
  );
}
