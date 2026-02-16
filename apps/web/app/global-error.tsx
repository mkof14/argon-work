"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="site-shell">
          <section className="card" style={{ marginTop: 20 }}>
            <h1 className="page-title">Critical error</h1>
            <p className="page-lead">A global rendering error occurred.</p>
            <pre style={{ whiteSpace: "pre-wrap" }}>{error.message}</pre>
            <button className="btn btn-primary" type="button" onClick={reset}>
              Reload
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
