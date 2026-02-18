import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { AuthControls } from "./auth/AuthControls";
import { domainPages, primaryNav } from "../lib/site";

export function WorkHeader() {
  return (
    <header className="work-header">
      <Link href="/" className="brand">
        <Image
          src="/brand/agron_blue.webp"
          alt="AGRON Work"
          width={170}
          height={52}
          className="brand-logo-image"
          priority
        />
        <span>
          <strong className="brand-work">Work</strong>
          <small>Autonomous Services Talent Platform</small>
        </span>
      </Link>
      <nav className="work-nav">
        <Link href="/">Home</Link>
        {primaryNav.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <details className="nav-dropdown worktypes-dropdown">
          <summary>Work Types</summary>
          <div className="nav-dropdown-menu">
            <Link href="/specialties">All specialties</Link>
            {domainPages.map((domain) => (
              <Link key={domain.href} href={domain.href}>
                {domain.label}
              </Link>
            ))}
          </div>
        </details>
        <details className="nav-dropdown">
          <summary>Platform</summary>
          <div className="nav-dropdown-menu">
            <Link href="/jobs">Jobs</Link>
            <Link href="/learning-center">Learning Center</Link>
            <Link href="/talent">For Job Seekers</Link>
            <Link href="/ai-tools">AI Tools</Link>
            <Link href="/hiring-lab">Hiring Lab</Link>
            <Link href="/services">Services</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/support">Support</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </details>
      </nav>
      <div className="work-actions">
        <ThemeToggle />
        <AuthControls />
      </div>
    </header>
  );
}
