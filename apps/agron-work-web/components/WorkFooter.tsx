import Link from "next/link";
import Image from "next/image";
import { footerSections } from "../lib/site";

function SocialIcon({ name }: { name: string }) {
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <path fill="currentColor" d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.95 1.95 0 1 0 5.25 6.9 1.95 1.95 0 0 0 5.25 3Zm4.06 5.5V20h3.38v-6.2c0-1.63.3-3.2 2.32-3.2 1.98 0 2 1.86 2 3.3V20H20.4v-6.8c0-3.33-.72-5.9-4.61-5.9-1.86 0-3.1 1.02-3.61 1.99h-.05V8.5H9.31Z" />
      </svg>
    );
  }
  if (name === "X") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <path fill="currentColor" d="M18.24 2h3.21l-7.01 8.01L22.7 22h-6.46l-5.06-6.62L5.4 22H2.18l7.5-8.57L1.75 2h6.63l4.57 6.03L18.24 2Zm-1.13 18.05h1.78L7.41 3.85H5.5l11.61 16.2Z" />
      </svg>
    );
  }
  if (name === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <path fill="currentColor" d="M23 12s0-3.09-.39-4.57a3.02 3.02 0 0 0-2.13-2.13C18.99 4.9 12 4.9 12 4.9s-6.99 0-8.48.4A3.02 3.02 0 0 0 1.4 7.43C1 8.91 1 12 1 12s0 3.09.4 4.57a3.02 3.02 0 0 0 2.12 2.13c1.49.4 8.48.4 8.48.4s6.99 0 8.48-.4a3.02 3.02 0 0 0 2.13-2.13C23 15.09 23 12 23 12ZM9.2 15.5v-7l6.1 3.5-6.1 3.5Z" />
      </svg>
    );
  }
  if (name === "Telegram") {
    return (
      <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
        <path fill="currentColor" d="M9.04 15.47 8.66 20c.54 0 .78-.23 1.06-.5l2.55-2.43 5.28 3.87c.97.53 1.65.25 1.91-.9l3.46-16.22h.01c.3-1.37-.49-1.91-1.43-1.56L1.32 10.03c-1.34.53-1.32 1.28-.23 1.62l5.15 1.6L18.2 5.7c.56-.34 1.08-.15.66.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="social-svg" aria-hidden="true">
      <path fill="currentColor" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.03 3.66 9.2 8.44 9.94v-7.03H7.9v-2.9h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.58v1.89h2.79l-.45 2.9h-2.34V22c4.78-.74 8.44-4.91 8.44-9.94Z" />
    </svg>
  );
}

export function WorkFooter() {
  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com" },
    { name: "X", href: "https://x.com" },
    { name: "YouTube", href: "https://www.youtube.com" },
    { name: "Telegram", href: "https://t.me" },
    { name: "Facebook", href: "https://www.facebook.com" }
  ] as const;
  const liveYear = new Date().getFullYear();

  return (
    <footer className="work-footer">
      <div className="footer-top">
        <Link href="/" className="footer-brand">
          <Image
            src="/brand/agron_blue.webp"
            alt="AGRON Work"
            width={180}
            height={56}
            className="footer-logo-image"
          />
          <span className="footer-work">Work</span>
        </Link>
        <p className="footer-lead">Work is a direct job platform for drone, robotics, AI, data and automation professionals.</p>
        <p className="footer-acronym">
          <span className="footer-acronym-badge">AGRON</span>
          <span className="footer-acronym-text">
            <strong>A</strong>erial-<strong>G</strong>round <strong>R</strong>obotics <strong>O</strong>perations <strong>N</strong>etwork
          </span>
        </p>
      </div>

      <div className="footer-sections">
        {footerSections.map((section) => (
          section.title === "All Pages" ? (
            <details key={section.title} className="footer-section footer-section-collapsible">
              <summary>{section.title}</summary>
              <div className="footer-link-list footer-link-list-two-col">
                {section.links.map((link) => (
                  <Link key={`${section.title}-${link.href}`} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
          ) : (
            <section key={section.title} className="footer-section">
              <h4>{section.title}</h4>
              <div className="footer-link-list">
                {section.links.map((link) => (
                  <Link key={`${section.title}-${link.href}`} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">Copyright © {liveYear} Work. All rights reserved.</p>
        <div className="social-links">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="social-icon-link"
              title={social.name}
              aria-label={social.name}
            >
              <SocialIcon name={social.name} />
              <span className="sr-only">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
