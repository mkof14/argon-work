"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Mode = "login" | "register";

const employmentTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship"
] as const;

const workModeOptions = ["Remote", "Hybrid", "On-site", "Flexible"] as const;
const availabilityOptions = ["Immediate", "2 weeks", "1 month", "Flexible"] as const;

export function AuthForm() {
  const params = useSearchParams();
  const initialMode = params.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [emailCodeSent, setEmailCodeSent] = useState<string | null>(null);
  const [phoneCodeSent, setPhoneCodeSent] = useState<string | null>(null);
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [phoneCodeInput, setPhoneCodeInput] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<(typeof workModeOptions)[number]>("Remote");
  const [minSalary, setMinSalary] = useState(50000);
  const [currency, setCurrency] = useState("USD");
  const [yearsExperience, setYearsExperience] = useState(1);
  const [availability, setAvailability] = useState<(typeof availabilityOptions)[number]>("Flexible");

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");

  const totalSteps = 5;
  const progressPct = Math.round((step / totalSteps) * 100);

  const googleError = useMemo(() => {
    const code = params.get("error");
    if (!code) return null;
    if (code === "google_not_configured") return "Google sign-in is not configured yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.";
    if (code === "google_state_invalid") return "Google login state is invalid or expired. Please try again.";
    if (code === "google_token_exchange_failed") return "Failed to exchange Google token.";
    if (code === "google_userinfo_failed") return "Failed to get Google profile.";
    return "Authentication error. Please try again.";
  }, [params]);

  function validateCurrentStep() {
    if (step === 1) {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("Name, email, and password are required.");
        return false;
      }
      if (password.trim().length < 8) {
        setError("Password must be at least 8 characters.");
        return false;
      }
    }

    if (step === 2) {
      if (!phone.trim()) {
        setError("Phone number is required.");
        return false;
      }
      if (!emailVerified || !phoneVerified) {
        setError("Verify both email and phone to continue.");
        return false;
      }
    }

    if (step === 3) {
      if (!jobTitle.trim()) {
        setError("Job title is required.");
        return false;
      }
      if (employmentTypes.length === 0) {
        setError("Select at least one employment type.");
        return false;
      }
    }

    if (step === 4) {
      if (!addressLine1.trim() || !city.trim() || !stateRegion.trim() || !zipCode.trim() || !country.trim()) {
        setError("Address, city, state/region, ZIP, and country are required.");
        return false;
      }
    }

    setError(null);
    return true;
  }

  function nextStep() {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(totalSteps, current + 1));
  }

  function prevStep() {
    setError(null);
    setStep((current) => Math.max(1, current - 1));
  }

  async function submitLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? "Request failed");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  async function submitRegister(event: FormEvent) {
    event.preventDefault();

    if (!validateCurrentStep()) return;

    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        emailVerified,
        phoneVerified,
        jobTitle,
        skills,
        employmentTypes,
        workMode,
        minSalary,
        currency,
        yearsExperience,
        availability,
        addressLine1,
        addressLine2,
        city,
        stateRegion,
        zipCode,
        country
      })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error ?? "Registration failed");
      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  function toggleEmploymentType(type: string) {
    setEmploymentTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type]
    );
  }

  return (
    <article className="card auth-card">
      <div className="auth-mode-row">
        <button type="button" className={mode === "login" ? "tab active" : "tab"} onClick={() => setMode("login")}>Login</button>
        <button type="button" className={mode === "register" ? "tab active" : "tab"} onClick={() => setMode("register")}>Register</button>
      </div>

      {mode === "login" ? (
        <form className="auth-form" onSubmit={submitLogin}>
          <label className="field">
            <span>Email</span>
            <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>

          <label className="field">
            <span>Password</span>
            <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>

          {error ? <p className="error-line">{error}</p> : null}
          {googleError ? <p className="error-line">{googleError}</p> : null}

          <div className="row">
            <button type="submit" className="btn solid" disabled={loading}>
              {loading ? "Please wait..." : "Log in"}
            </button>
            <a className="btn ghost" href="/api/auth/google/start">Continue with Google</a>
          </div>
        </form>
      ) : (
        <form className="auth-form" onSubmit={submitRegister}>
          <div className="step-header">
            <div className="step-meta">
              <strong>Registration process</strong>
              <span>Step {step} of {totalSteps}</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={step}>
              <span className="progress-bar" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          {step === 1 ? (
            <div className="step-grid">
              <label className="field">
                <span>Full name</span>
                <input className="input" value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
              <label className="field">
                <span>Email</span>
                <input className="input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="field">
                <span>Password</span>
                <input className="input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="step-grid">
              <label className="field">
                <span>Phone</span>
                <input className="input" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+1 ..." required />
              </label>

              <div className="verify-box">
                <span>Email verification</span>
                <div className="row">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => {
                      const code = String(Math.floor(100000 + Math.random() * 900000));
                      setEmailCodeSent(code);
                      setEmailVerified(false);
                    }}
                  >
                    Send code
                  </button>
                  <input className="input" value={emailCodeInput} onChange={(event) => setEmailCodeInput(event.target.value)} placeholder="Enter code" />
                  <button
                    type="button"
                    className="btn solid"
                    onClick={() => setEmailVerified(Boolean(emailCodeSent && emailCodeInput.trim() === emailCodeSent))}
                  >
                    Confirm
                  </button>
                </div>
                {emailCodeSent ? <p className="hint-line">Demo code: {emailCodeSent}</p> : null}
                <p className={emailVerified ? "ok-line" : "hint-line"}>{emailVerified ? "Email verified" : "Not verified"}</p>
              </div>

              <div className="verify-box">
                <span>Phone verification</span>
                <div className="row">
                  <button
                    type="button"
                    className="btn ghost"
                    onClick={() => {
                      const code = String(Math.floor(100000 + Math.random() * 900000));
                      setPhoneCodeSent(code);
                      setPhoneVerified(false);
                    }}
                  >
                    Send code
                  </button>
                  <input className="input" value={phoneCodeInput} onChange={(event) => setPhoneCodeInput(event.target.value)} placeholder="Enter code" />
                  <button
                    type="button"
                    className="btn solid"
                    onClick={() => setPhoneVerified(Boolean(phoneCodeSent && phoneCodeInput.trim() === phoneCodeSent))}
                  >
                    Confirm
                  </button>
                </div>
                {phoneCodeSent ? <p className="hint-line">Demo code: {phoneCodeSent}</p> : null}
                <p className={phoneVerified ? "ok-line" : "hint-line"}>{phoneVerified ? "Phone verified" : "Not verified"}</p>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="step-grid">
              <label className="field">
                <span>Job title</span>
                <input className="input" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} placeholder="Senior ML Engineer" />
              </label>
              <label className="field">
                <span>Skills (comma-separated)</span>
                <input className="input" value={skills} onChange={(event) => setSkills(event.target.value)} placeholder="Python, CV, MLOps, Robotics" />
              </label>
              <label className="field">
                <span>Minimum salary</span>
                <input className="input" type="number" min={0} value={minSalary} onChange={(event) => setMinSalary(Number(event.target.value))} />
              </label>
              <label className="field">
                <span>Currency</span>
                <input className="input" value={currency} onChange={(event) => setCurrency(event.target.value.toUpperCase())} placeholder="USD" />
              </label>
              <label className="field">
                <span>Years of experience</span>
                <input className="input" type="number" min={0} value={yearsExperience} onChange={(event) => setYearsExperience(Number(event.target.value))} />
              </label>
              <label className="field">
                <span>Work mode</span>
                <select value={workMode} onChange={(event) => setWorkMode(event.target.value as (typeof workModeOptions)[number])}>
                  {workModeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Availability</span>
                <select value={availability} onChange={(event) => setAvailability(event.target.value as (typeof availabilityOptions)[number])}>
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <div className="field">
                <span>Employment type</span>
                <div className="check-grid">
                  {employmentTypeOptions.map((type) => (
                    <label className="check-item" key={type}>
                      <input
                        type="checkbox"
                        checked={employmentTypes.includes(type)}
                        onChange={() => toggleEmploymentType(type)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="step-grid">
              <label className="field">
                <span>Address line 1</span>
                <input className="input" value={addressLine1} onChange={(event) => setAddressLine1(event.target.value)} />
              </label>
              <label className="field">
                <span>Address line 2</span>
                <input className="input" value={addressLine2} onChange={(event) => setAddressLine2(event.target.value)} />
              </label>
              <label className="field">
                <span>City</span>
                <input className="input" value={city} onChange={(event) => setCity(event.target.value)} />
              </label>
              <label className="field">
                <span>State/Region</span>
                <input className="input" value={stateRegion} onChange={(event) => setStateRegion(event.target.value)} />
              </label>
              <label className="field">
                <span>ZIP</span>
                <input className="input" value={zipCode} onChange={(event) => setZipCode(event.target.value)} />
              </label>
              <label className="field">
                <span>Country</span>
                <input className="input" value={country} onChange={(event) => setCountry(event.target.value)} />
              </label>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="summary-box">
              <h3>Review</h3>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email} ({emailVerified ? "verified" : "not verified"})</p>
              <p><strong>Phone:</strong> {phone} ({phoneVerified ? "verified" : "not verified"})</p>
              <p><strong>Job title:</strong> {jobTitle}</p>
              <p><strong>Skills:</strong> {skills || "-"}</p>
              <p><strong>Salary:</strong> {minSalary} {currency}</p>
              <p><strong>Work mode:</strong> {workMode}</p>
              <p><strong>Employment:</strong> {employmentTypes.join(", ") || "-"}</p>
              <p><strong>Experience:</strong> {yearsExperience} years</p>
              <p><strong>Availability:</strong> {availability}</p>
              <p><strong>Address:</strong> {addressLine1}{addressLine2 ? `, ${addressLine2}` : ""}, {city}, {stateRegion}, {zipCode}, {country}</p>
            </div>
          ) : null}

          {error ? <p className="error-line">{error}</p> : null}
          {googleError ? <p className="error-line">{googleError}</p> : null}

          <div className="row">
            {step > 1 ? (
              <button type="button" className="btn ghost" onClick={prevStep}>Back</button>
            ) : null}
            {step < totalSteps ? (
              <button type="button" className="btn solid" onClick={nextStep}>Next step</button>
            ) : (
              <button type="submit" className="btn solid" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            )}
            <a className="btn ghost" href="/api/auth/google/start">Continue with Google</a>
          </div>
        </form>
      )}
    </article>
  );
}
