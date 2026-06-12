import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '../../context/ChatContext.jsx'

/**
 * VisitorForm — collects name + email before chat starts.
 *
 * Flow A — New visitor:
 *   Step 1: Enter name → Step 2: Enter email → Creates new session → Chat opens
 *
 * Flow B — Returning visitor:
 *   Step 1: Enter email (shortcut screen) → Email found → Show "Welcome back, {name}"
 *   → Load previous conversation → Chat opens with history
 *
 * The form detects returning users by checking the email on blur/submit against
 * the backend via identifyVisitor(). If the visitor already exists, the name step
 * is skipped entirely and a "welcome back" message is shown before loading.
 */

const VisitorForm = () => {
  const { identifyVisitor } = useChat()

  // 'email-first' | 'name' | 'email-new' | 'loading' | 'welcome-back'
  const [step, setStep] = useState('email-first')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [returningUser, setReturningUser] = useState(null) // { name } if found
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  const emailRef = useRef(null)
  const nameRef = useRef(null)

  // Auto-focus on step change
  useEffect(() => {
    if (step === 'email-first' || step === 'email-new') {
      setTimeout(() => emailRef.current?.focus(), 80)
    }
    if (step === 'name') {
      setTimeout(() => nameRef.current?.focus(), 80)
    }
  }, [step])

  // ── Email-first step: check if email already exists ──────────────────────────
  const handleEmailFirstSubmit = async (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email)) {
      return setError('Please enter a valid email address.')
    }
    setError('')
    setCheckingEmail(true)

    try {
      // Call a lightweight check endpoint — POST /visitors/check-email
      // Returns { exists: true, visitor: { name } } or { exists: false }
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/visitors/check-email`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        }
      )
      const data = await res.json()

      if (data.exists && data.visitor) {
        // Returning visitor — skip name, show welcome back
        setReturningUser(data.visitor)
        setStep('welcome-back')
      } else {
        // New visitor — collect name first
        setStep('name')
      }
    } catch {
      // If check fails, fall back to new visitor flow
      setStep('name')
    } finally {
      setCheckingEmail(false)
    }
  }

  // ── Welcome back: auto-load after brief moment ───────────────────────────────
  const handleWelcomeBackContinue = async () => {
    setLoading(true)
    try {
      await identifyVisitor({
        name: returningUser.name,
        email: email.trim().toLowerCase(),
      })
    } catch {
      setError('Something went wrong. Please try again.')
      setStep('email-first')
    } finally {
      setLoading(false)
    }
  }

  // ── New visitor: name step ────────────────────────────────────────────────────
  const handleNameSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return setError('Please enter your name.')
    setError('')
    setStep('email-new')
  }

  // ── New visitor: email confirmation ──────────────────────────────────────────
  const handleNewEmailSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await identifyVisitor({
        name: name.trim(),
        email: email.trim().toLowerCase(),
      })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 animate-fade-in">

      {/* ── STEP: email-first (entry point) ──────────────────────────────────── */}
      {step === 'email-first' && (
        <>
          <IconAvatar icon="chat" />
          <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
            Welcome! 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
            Enter your email to start chatting — we'll load your previous
            conversation if you've been here before.
          </p>

          <form onSubmit={handleEmailFirstSubmit} className="w-full max-w-xs space-y-3">
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com"
                className={inputClass(error)}
              />
              {checkingEmail && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Spinner small />
                </span>
              )}
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={checkingEmail}
              className={primaryBtn}
            >
              {checkingEmail ? <><Spinner /> Checking...</> : 'Continue →'}
            </button>
          </form>
        </>
      )}

      {/* ── STEP: welcome-back (returning visitor detected) ──────────────────── */}
      {step === 'welcome-back' && (
        <>
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
            Welcome back, {returningUser?.name}! 🎉
          </h2>
          <p className="text-sm text-gray-500 text-center mb-2 max-w-xs">
            We found your previous conversation.
          </p>

          {/* Email chip */}
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full mb-6">
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">{email}</span>
          </div>

          {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

          <div className="w-full max-w-xs space-y-2">
            <button
              onClick={handleWelcomeBackContinue}
              disabled={loading}
              className={primaryBtn}
            >
              {loading ? <><Spinner /> Loading your chat...</> : 'Load My Conversation →'}
            </button>
            <button
              type="button"
              onClick={() => { setStep('email-first'); setReturningUser(null); setError('') }}
              className={ghostBtn}
            >
              ← Use a different email
            </button>
          </div>
        </>
      )}

      {/* ── STEP: name (new visitor, step 1) ─────────────────────────────────── */}
      {step === 'name' && (
        <>
          <IconAvatar icon="person" />
          <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
            Nice to meet you!
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6 max-w-xs">
            What should we call you?
          </p>

          <form onSubmit={handleNameSubmit} className="w-full max-w-xs space-y-3">
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setError('') }}
              placeholder="Your full name"
              className={inputClass(error)}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className={primaryBtn}>
              Continue →
            </button>
            <button
              type="button"
              onClick={() => { setStep('email-first'); setError('') }}
              className={ghostBtn}
            >
              ← Back
            </button>
          </form>
        </>
      )}

      {/* ── STEP: email-new (new visitor, step 2 — confirm email) ────────────── */}
      {step === 'email-new' && (
        <>
          <IconAvatar icon="person" />
          <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">
            Hi {name}! 👋
          </h2>
          <p className="text-sm text-gray-500 text-center mb-2 max-w-xs">
            Confirm your email address so we can save your conversation.
          </p>

          {/* Email chip (pre-filled, editable) */}
          <div className="flex items-center gap-2 bg-brand-light px-3 py-1.5 rounded-full mb-5">
            <svg className="w-3.5 h-3.5 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-xs text-brand-primary font-medium">{email}</span>
          </div>

          <form onSubmit={handleNewEmailSubmit} className="w-full max-w-xs space-y-3">
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={primaryBtn}
            >
              {loading ? <><Spinner /> Starting chat...</> : 'Start Chatting →'}
            </button>
            <button
              type="button"
              onClick={() => { setStep('name'); setError('') }}
              className={ghostBtn}
            >
              ← Edit name
            </button>
            <button
              type="button"
              onClick={() => { setStep('email-first'); setEmail(''); setError('') }}
              className={ghostBtn}
            >
              ← Change email
            </button>
          </form>
        </>
      )}

      {/* Footer note */}
      <p className="text-xs text-gray-300 mt-6 text-center">
        Your information is kept private and secure.
      </p>
    </div>
  )
}

// ── Shared style tokens ─────────────────────────────────────────────────────────
const primaryBtn = `
  w-full bg-brand-primary hover:bg-brand-dark disabled:opacity-60
  text-white text-sm font-medium py-2.5 rounded-xl transition-colors duration-200
  flex items-center justify-center gap-2 cursor-pointer
`
const ghostBtn = `
  w-full text-xs text-gray-400 hover:text-gray-600 py-1.5 transition-colors
`
const inputClass = (error) => `
  w-full border ${error ? 'border-red-300' : 'border-gray-300'} rounded-xl px-4 py-2.5 text-sm
  focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:border-transparent
  placeholder-gray-400 transition
`

// ── Small reusable components ───────────────────────────────────────────────────
const Spinner = ({ small }) => (
  <svg
    className={`animate-spin ${small ? 'w-3.5 h-3.5' : 'w-4 h-4'}`}
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
  </svg>
)

const IconAvatar = ({ icon }) => (
  <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
    {icon === 'chat' ? (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ) : (
      <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )}
  </div>
)

export default VisitorForm