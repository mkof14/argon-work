"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="site-shell">
      <section className="card" style={{ marginTop: 20 }}>
        <h1 className="page-title">Something went wrong</h1>
        <p className="page-lead">The page failed to load. Try refreshing or return to home.</p>
        <button className="btn btn-primary" type="button" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
