import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem 1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "32rem", display: "grid", gap: "1.5rem", justifyItems: "center" }}>
        <span className="eyebrow eyebrow--boxed">404</span>
        <h1 className="h2">This page isn&apos;t here.</h1>
        <p style={{ color: "rgba(17,17,17,.65)", lineHeight: 1.7 }}>
          The link may be out of date, or the page was renamed. Everything worth reading lives on the
          main page.
        </p>
        <Link href="/" className="pill pill--dark">
          <span className="pill-in">Back to the portfolio</span>
        </Link>
      </div>
    </main>
  );
}
