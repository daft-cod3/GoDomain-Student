"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PROVIDERS = [

  {
    id: "google",
    label: "Google",
    className: "google",
    subtitle: "Drive with Google",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="provider-icon">
        <path
          fill="#4285F4"
          d="M21.35 11.1H12v2.8h5.35c-.24 1.3-.97 2.4-2.05 3.15v2.6h3.32c1.95-1.8 3.08-4.45 3.08-7.55 0-.5-.05-.98-.13-1.45z"
        />
        <path
          fill="#34A853"
          d="M12 22c2.7 0 4.95-.9 6.6-2.45l-3.32-2.6c-.9.62-2.05.98-3.28.98-2.53 0-4.68-1.7-5.44-4.05H3.1v2.55C4.75 19.9 8.1 22 12 22z"
        />
        <path
          fill="#FBBC05"
          d="M6.56 13.88A5.98 5.98 0 0 1 6 12c0-.6.1-1.18.31-1.72V7.73H3.1A9.99 9.99 0 0 0 2 12c0 1.6.4 3.1 1.1 4.42l3.46-2.54z"
        />
        <path
          fill="#EA4335"
          d="M12 4.5c1.47 0 2.77.5 3.8 1.47l2.85-2.85C16.95 1.45 14.7.5 12 .5 8.1.5 4.75 2.6 3.1 5.75l3.46 2.55C7.32 6.2 9.47 4.5 12 4.5z"
        />
      </svg>
    ),
  },
  {
    id: "facebook",
    label: "Facebook",
    className: "facebook",
    subtitle: "Shift with Facebook",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="provider-icon">
        <path
          fill="#1877F2"
          d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z"
        />
      </svg>
    ),
  },
];

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [mode, setMode] = useState("login");


  const [resetMode, setResetMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (mode !== "login") {
      setResetMode(false);
    }
  }, [mode]);

  async function handleAuthentication(route, payload) {
    setMessage("");
    setBusy(true);

    try {
      const response = await fetch(route, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to complete authentication.");
      }

      if (route === "/api/auth/forgot-password") {
        setMessage(
          data.message || "If your account exists, a reset link was sent.",
        );
        return;
      }

      router.push(redirectTo);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (resetMode) {
      return handleAuthentication("/api/auth/forgot-password", { email });
    }

    if (!email || (!password && mode !== "register")) {
      setMessage("Please complete the required fields.");
      return;
    }

    const route =
      mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const payload = { email, password };
    if (mode === "register") {
      payload.displayName = displayName || email.split("@")[0];
    }

    return handleAuthentication(route, payload);
  }

  async function handleProvider(provider) {
    setMessage("");
    setBusy(true);

    try {
      const response = await fetch("/api/auth/provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Provider login failed.");
      }

      router.push(redirectTo);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-shell">
        <aside className="auth-aside">
          <span className="auth-side-tag">Automatic gear shifter</span>
          <h1>Shift your learner journey into drive.</h1>
          <p>
            Park your lessons safely, reverse bad study habits, and accelerate
            through your dashboard with secure access.
          </p>

          <div className="auth-gear-grid">
            <div>
              <strong>Park</strong>
              <p>Keep your account locked until you sign in.</p>
            </div>
            <div>
              <strong>Reverse</strong>
              <p>Undo old progress trackers and refresh your session.</p>
            </div>
            <div>
              <strong>Neutral</strong>
              <p>Access content in read-only preview mode before logging in.</p>
            </div>
            <div>
              <strong>Drive</strong>
              <p>Unlock dashboard, stats, and progress data instantly.</p>
            </div>
          </div>
        </aside>

        <section className="auth-panel">
          <div className="auth-panel-head">
            <div>
              <span className="auth-eyebrow">
                {resetMode
                  ? "Forgot password"
                  : mode === "register"
                    ? "New learner registration"
                    : "Secure sign in"}
              </span>
              <h2>
                {resetMode
                  ? "Reset your password"
                  : mode === "register"
                    ? "Create your account"
                    : "Sign into GoDomain"}
              </h2>
            </div>
            <button
              type="button"
              className="auth-mode-toggle"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setMessage("");
              }}
            >
              {mode === "login" ? "Register instead" : "Back to sign in"}
            </button>
          </div>

          <p className="auth-panel-copy">
            {resetMode
              ? "Enter the email address tied to your account and we’ll send a reset link."
              : mode === "register"
                ? "Create a safer learner account with email and password access."
                : "Use your credentials or continue with Google / Facebook to reach the dashboard."}
          </p>

          {message && <div className="auth-error">{message}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="you@domain.com"
              />
            </label>

            {!resetMode && mode === "register" && (
              <label>
                Display name
                <input
                  type="text"
                  value={displayName}
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Your learner name"
                />
              </label>
            )}

            {!resetMode && (
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete={
                    mode === "register" ? "new-password" : "current-password"
                  }
                  placeholder={
                    mode === "register"
                      ? "Create a strong password"
                      : "Enter your password"
                  }
                />
              </label>
            )}

            <div className="auth-actions">
              <button type="submit" className="auth-submit" disabled={busy}>
                {busy
                  ? "Processing…"
                  : resetMode
                    ? "Send reset link"
                    : mode === "register"
                      ? "Create account"
                      : "Sign in"}
              </button>
              {!resetMode && (
                <button
                  type="button"
                  className="auth-text-button"
                  onClick={() => setResetMode(true)}
                >
                  Forgot password?
                </button>
              )}
            </div>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-providers">
            {PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className={`provider-button ${provider.className}`}
                onClick={() => handleProvider(provider.id)}
                disabled={busy}
              >
                {provider.icon}
                <span>
                  {provider.label}
                  <small>{provider.subtitle}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="auth-footnote">
            <span>
              Need help? Contact your GoDomain support team if you can’t access
              your account.
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}


export default function LoginPage() {
  return (
    <Suspense fallback={<div className="auth-loading" />}>
      <LoginPageInner />
    </Suspense>
  );
}


