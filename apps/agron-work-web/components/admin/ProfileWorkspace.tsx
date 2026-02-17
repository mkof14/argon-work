"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Profile = {
  fullName: string;
  title: string;
  about: string;
  location: string;
  phone: string;
  website?: string;
  skills: string[];
  avatarDataUrl?: string;
};

type Resume = {
  summary: string;
  experience: string;
  education: string;
  certifications: string;
  languages: string;
  resumeFileName?: string;
  resumeFileType?: string;
  resumeFileDataUrl?: string;
};

type Tab = "profile" | "resume" | "reviews" | "settings";

type Settings = {
  publicProfile: boolean;
  emailAlerts: boolean;
  smsAlerts: boolean;
  darkByDefault: boolean;
};

const reviewsDemo = [
  { id: "r1", title: "UAV Inspection Program", reviewer: "SkyGrid Logistics", rating: 5, text: "Excellent communication and delivery quality.", date: "2026-01-14" },
  { id: "r2", title: "AI Model Optimization", reviewer: "AgriPulse AI", rating: 4, text: "Strong technical level and practical results.", date: "2025-12-02" },
  { id: "r3", title: "Remote Operations Setup", reviewer: "Nova Robotics", rating: 5, text: "Fast onboarding and reliable execution.", date: "2025-11-09" }
];

export function ProfileWorkspace() {
  const search = useSearchParams();
  const queryTab = search.get("tab");
  const initialTab: Tab = queryTab === "resume" || queryTab === "reviews" || queryTab === "settings" ? queryTab : "profile";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [settings, setSettings] = useState<Settings>({
    publicProfile: true,
    emailAlerts: true,
    smsAlerts: false,
    darkByDefault: false
  });
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function load() {
      const [p, r] = await Promise.all([fetch("/api/profile"), fetch("/api/resume")]);
      const pd = await p.json();
      const rd = await r.json();
      setProfile(pd.profile);
      setResume(rd.resume);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const ratingAvg = useMemo(() => {
    return (reviewsDemo.reduce((acc, item) => acc + item.rating, 0) / reviewsDemo.length).toFixed(1);
  }, []);

  async function saveProfile(nextProfile: Profile, successText = "Profile saved") {
    setProfile(nextProfile);
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextProfile)
    });
    if (!res.ok) {
      setMessage("Failed to save profile");
      return false;
    }
    setMessage(successText);
    window.dispatchEvent(new Event("agron-profile-updated"));
    return true;
  }

  async function fileToImageDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const data = typeof reader.result === "string" ? reader.result : "";
        if (!data) {
          reject(new Error("Unable to read image"));
          return;
        }
        resolve(data);
      };
      reader.onerror = () => reject(new Error("Unable to read image"));
      reader.readAsDataURL(file);
    });
  }

  async function compressAvatar(file: File) {
    const dataUrl = await fileToImageDataUrl(file);
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Invalid image"));
      img.src = dataUrl;
    });

    const maxSide = 512;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    context.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", 0.82);
  }

  async function uploadAvatarFile(file: File) {
    if (!profile) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMessage("Image is too large. Max size is 8MB.");
      return;
    }
    try {
      const compressed = await compressAvatar(file);
      const next = { ...profile, avatarDataUrl: compressed };
      await saveProfile(next, "Photo uploaded");
    } catch {
      setMessage("Unable to process this image.");
    }
  }

  async function saveResume(nextResume: Resume, successText = "Resume saved") {
    setResume(nextResume);
    const res = await fetch("/api/resume", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextResume)
    });
    if (!res.ok) {
      setMessage("Failed to save resume");
      return false;
    }
    setMessage(successText);
    return true;
  }

  if (loading || !profile || !resume) {
    return <p className="page-subtitle">Loading profile...</p>;
  }

  const initial = profile.fullName.slice(0, 1).toUpperCase();

  return (
    <div className="profile-hub">
      <aside className="card profile-sidebar">
        <div
          className="profile-avatar profile-avatar-upload"
          title="Click to upload photo"
          role="button"
          tabIndex={0}
          onClick={() => avatarInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              avatarInputRef.current?.click();
            }
          }}
        >
          {profile.avatarDataUrl ? (
            <img src={profile.avatarDataUrl} alt={profile.fullName} className="profile-avatar-image" />
          ) : (
            initial
          )}
        </div>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="profile-avatar-input"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            await uploadAvatarFile(file);
            e.currentTarget.value = "";
          }}
        />
        <div className="row compact">
          <button type="button" className="btn ghost" onClick={() => avatarInputRef.current?.click()}>
            Add Photo to Profile Icon
          </button>
        </div>
        <p className="hint-line">Photo appears in this round icon and in the top menu icon.</p>
        <h3>{profile.fullName}</h3>
        <p className="hint-line">{profile.title || "Professional profile"}</p>
        <div className="profile-nav-list">
          <button type="button" className={tab === "profile" ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setTab("profile")}>Profile</button>
          <button type="button" className={tab === "resume" ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setTab("resume")}>Resume</button>
          <button type="button" className={tab === "reviews" ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setTab("reviews")}>My Reviews</button>
          <button type="button" className={tab === "settings" ? "admin-nav-item active" : "admin-nav-item"} onClick={() => setTab("settings")}>Settings</button>
        </div>
      </aside>

      <section className="profile-content">
        {tab === "profile" ? (
          <article className="card">
            <h3>Profile</h3>
            <div className="step-grid">
              <label className="field">
                <span>Profile photo</span>
                <input
                  className="input"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    await uploadAvatarFile(file);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
              <label className="field"><span>Full name</span><input className="input" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} /></label>
              <label className="field"><span>Job title</span><input className="input" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} /></label>
              <label className="field"><span>Location</span><input className="input" value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} /></label>
              <label className="field"><span>Phone</span><input className="input" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
              <label className="field"><span>Website</span><input className="input" value={profile.website ?? ""} onChange={(e) => setProfile({ ...profile, website: e.target.value })} /></label>
              <label className="field"><span>Skills (comma-separated)</span><input className="input" value={profile.skills.join(", ")} onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} /></label>
              <label className="field"><span>About</span><textarea className="input area" value={profile.about} onChange={(e) => setProfile({ ...profile, about: e.target.value })} /></label>
            </div>
            <div className="row">
              <button
                type="button"
                className="btn ghost"
                onClick={async () => {
                  const next = { ...profile, avatarDataUrl: undefined };
                  await saveProfile(next, "Photo removed");
                }}
              >
                Remove Photo
              </button>
              <button
                type="button"
                className="btn solid"
                onClick={async () => {
                  await saveProfile(profile);
                }}
              >
                Save Profile
              </button>
            </div>
          </article>
        ) : null}

        {tab === "resume" ? (
          <article className="card">
            <h3>Resume</h3>
            <div className="step-grid">
              <label className="field">
                <span>Resume document (PDF, DOC, DOCX)</span>
                <input
                  className="input"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 8 * 1024 * 1024) {
                      setMessage("Resume document is too large. Max size is 8MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = async () => {
                      const data = typeof reader.result === "string" ? reader.result : "";
                      if (!data) return;
                      const next = {
                        ...resume,
                        resumeFileName: file.name,
                        resumeFileType: file.type || "application/octet-stream",
                        resumeFileDataUrl: data
                      };
                      await saveResume(next, "Resume document uploaded");
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </label>
              {resume.resumeFileName ? (
                <div className="summary-box">
                  <p><strong>Uploaded document:</strong> {resume.resumeFileName}</p>
                  <div className="row compact">
                    <a
                      className="btn ghost"
                      href={resume.resumeFileDataUrl}
                      download={resume.resumeFileName}
                    >
                      Download
                    </a>
                    <button
                      type="button"
                      className="btn ghost"
                      onClick={async () => {
                        const next = {
                          ...resume,
                          resumeFileName: undefined,
                          resumeFileType: undefined,
                          resumeFileDataUrl: undefined
                        };
                        await saveResume(next, "Resume document removed");
                      }}
                    >
                      Remove document
                    </button>
                  </div>
                </div>
              ) : null}
              <label className="field"><span>Professional summary</span><textarea className="input area" value={resume.summary} onChange={(e) => setResume({ ...resume, summary: e.target.value })} /></label>
              <label className="field"><span>Experience</span><textarea className="input area" value={resume.experience} onChange={(e) => setResume({ ...resume, experience: e.target.value })} /></label>
              <label className="field"><span>Education</span><textarea className="input area" value={resume.education} onChange={(e) => setResume({ ...resume, education: e.target.value })} /></label>
              <label className="field"><span>Certifications</span><textarea className="input area" value={resume.certifications} onChange={(e) => setResume({ ...resume, certifications: e.target.value })} /></label>
              <label className="field"><span>Languages</span><input className="input" value={resume.languages} onChange={(e) => setResume({ ...resume, languages: e.target.value })} /></label>
            </div>
            <div className="row">
              <button
                type="button"
                className="btn solid"
                onClick={async () => {
                  await saveResume(resume);
                }}
              >
                Save Resume
              </button>
            </div>
          </article>
        ) : null}

        {tab === "reviews" ? (
          <article className="card">
            <h3>My Reviews</h3>
            <p className="page-subtitle">Average rating: <strong>{ratingAvg}</strong> / 5</p>
            <div className="message-list">
              {reviewsDemo.map((review) => (
                <article key={review.id} className="review-item">
                  <div className="review-top">
                    <p><strong>{review.title}</strong></p>
                    <span className={review.rating >= 5 ? "badge-good" : review.rating >= 4 ? "badge-warn" : "badge-critical"}>{review.rating}.0</span>
                  </div>
                  <p>{review.text}</p>
                  <p className="hint-line">{review.reviewer} · {review.date}</p>
                </article>
              ))}
            </div>
          </article>
        ) : null}

        {tab === "settings" ? (
          <article className="card">
            <h3>Settings</h3>
            <div className="check-grid">
              <label className="check-item"><input type="checkbox" checked={settings.publicProfile} onChange={() => setSettings({ ...settings, publicProfile: !settings.publicProfile })} /><span>Public profile visibility</span></label>
              <label className="check-item"><input type="checkbox" checked={settings.emailAlerts} onChange={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })} /><span>Email alerts</span></label>
              <label className="check-item"><input type="checkbox" checked={settings.smsAlerts} onChange={() => setSettings({ ...settings, smsAlerts: !settings.smsAlerts })} /><span>SMS alerts</span></label>
              <label className="check-item"><input type="checkbox" checked={settings.darkByDefault} onChange={() => setSettings({ ...settings, darkByDefault: !settings.darkByDefault })} /><span>Dark theme by default</span></label>
            </div>
            <div className="row">
              <button type="button" className="btn solid" onClick={() => setMessage("Settings saved")}>Save Settings</button>
            </div>
          </article>
        ) : null}

        {message ? <p className="status-ok">{message}</p> : null}
      </section>
    </div>
  );
}
