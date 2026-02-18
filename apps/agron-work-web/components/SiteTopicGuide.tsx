"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TopicGuide = {
  title: string;
  description: string;
  bullets: string[];
  actions: { label: string; href: string }[];
};

const defaultGuide: TopicGuide = {
  title: "How AGRON Work Helps",
  description: "Direct, simple hiring and job search for drone, robotics, AI, data and automation roles.",
  bullets: [
    "Use search and filters to find relevant roles faster.",
    "Keep profile and resume updated for better matching.",
    "Use AI tools and Hiring Lab for advanced workflows."
  ],
  actions: [
    { label: "Open Jobs", href: "/jobs" },
    { label: "Find Jobs", href: "/search" },
    { label: "Open AI Tools", href: "/ai-tools" }
  ]
};

function pickGuide(pathname: string): TopicGuide {
  if (pathname.startsWith("/search")) {
    return {
      title: "Search and Matching",
      description: "Find jobs by role, location, work mode and employment type with quick comparison.",
      bullets: [
        "Set clear keywords in What/Where fields.",
        "Use filters to reduce noise and improve fit.",
        "Open role profile to review skills and indicators."
      ],
      actions: [
        { label: "Open Jobs", href: "/jobs" },
        { label: "Open Profile", href: "/profile" },
        { label: "AI Match Tools", href: "/ai-tools" }
      ]
    };
  }
  if (pathname.startsWith("/ai-tools")) {
    return {
      title: "AI Career Tools",
      description: "Use AI to improve application quality and control application velocity.",
      bullets: [
        "Set match thresholds and daily limits before running auto-apply.",
        "Review match reasons and missing terms.",
        "Track funnel stages and improve conversion step by step."
      ],
      actions: [
        { label: "Update Profile", href: "/profile" },
        { label: "Find Jobs", href: "/search" },
        { label: "Open Messages", href: "/messages" }
      ]
    };
  }
  if (pathname.startsWith("/hiring-lab")) {
    return {
      title: "Hiring Lab",
      description: "Structured hiring for teams: scorecards, screeners, invites, benchmark ranges and anti-scam checks.",
      bullets: [
        "Create scorecards before opening a role.",
        "Use screener questions to filter early.",
        "Keep transparent notes for explainable hiring decisions."
      ],
      actions: [
        { label: "Employer Hub", href: "/employers" },
        { label: "Admin Panel", href: "/admin" },
        { label: "Services", href: "/services" }
      ]
    };
  }
  if (pathname.startsWith("/employers")) {
    return {
      title: "Employer Workspace",
      description: "Build reliable hiring pipelines with direct communication and verified candidates.",
      bullets: [
        "Publish role requirements and salary ranges clearly.",
        "Use invite-to-apply for strong candidate outreach.",
        "Monitor applications, interviews and offers in one flow."
      ],
      actions: [
        { label: "Open Hiring Lab", href: "/hiring-lab" },
        { label: "Browse Specialties", href: "/specialties" },
        { label: "Open Services", href: "/services" }
      ]
    };
  }
  if (pathname.startsWith("/talent")) {
    return {
      title: "Talent Network",
      description: "Build a strong candidate profile and move through hiring stages with clear signals.",
      bullets: [
        "Add practical skills and certifications.",
        "Keep resume focused on measurable outcomes.",
        "Track messages and application status in dashboard."
      ],
      actions: [
        { label: "Open Profile", href: "/profile" },
        { label: "Find Jobs", href: "/search" },
        { label: "Open Jobs", href: "/jobs" }
      ]
    };
  }
  if (pathname.startsWith("/legal")) {
    return {
      title: "Legal and Trust",
      description: "Platform policies for privacy, terms, acceptable use and AI disclosure.",
      bullets: [
        "Review terms and privacy before publishing jobs or applying.",
        "Use support channel for policy clarifications.",
        "Follow anti-fraud and account security guidance."
      ],
      actions: [
        { label: "Support", href: "/support" },
        { label: "Contact", href: "/contact" },
        { label: "Home", href: "/" }
      ]
    };
  }
  return defaultGuide;
}

function withLearningAction(pathname: string, guide: TopicGuide): TopicGuide {
  if (pathname.startsWith("/learning-center")) {
    return guide;
  }
  if (guide.actions.some((action) => action.href === "/learning-center")) {
    return guide;
  }
  return {
    ...guide,
    actions: [{ label: "Learning Center", href: "/learning-center" }, ...guide.actions]
  };
}

export function SiteTopicGuide() {
  const pathname = usePathname();
  const guide = useMemo(() => withLearningAction(pathname, pickGuide(pathname)), [pathname]);

  return (
    <aside className="card topic-guide">
      <details className="clean-collapse" open>
        <summary>{guide.title}</summary>
        <p className="page-subtitle">{guide.description}</p>
        <ul className="legal-list">
          {guide.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="row compact">
          {guide.actions.map((action) => (
            <Link key={action.href} className="btn ghost" href={action.href}>
              {action.label}
            </Link>
          ))}
        </div>
      </details>
    </aside>
  );
}
