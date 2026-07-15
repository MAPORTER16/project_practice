import { useState } from 'react'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <main className="app">
      <div className="hero-bg" aria-hidden="true">
        <svg className="flying-ball" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
          {/* motion streaks — sense of the ball flying through the air */}
          <g className="streaks" stroke="#e8e8e8" strokeLinecap="round" fill="none">
            <line x1="55" y1="82" x2="180" y2="82" strokeWidth="4" opacity="0.28" />
            <line x1="28" y1="100" x2="185" y2="100" strokeWidth="4" opacity="0.4" />
            <line x1="60" y1="118" x2="180" y2="118" strokeWidth="4" opacity="0.28" />
          </g>

          {/* baseball */}
          <g className="ball">
            <defs>
              <radialGradient id="ballShade" cx="38%" cy="32%" r="75%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#f4f1ea" />
                <stop offset="100%" stopColor="#d8d2c4" />
              </radialGradient>
            </defs>
            <circle cx="285" cy="100" r="68" fill="url(#ballShade)" stroke="#c9c3b4" strokeWidth="2" />
            {/* seam guides */}
            <path d="M243 44 C 280 78, 280 122, 243 156" fill="none" stroke="#e7b9bd" strokeWidth="1.5" />
            <path d="M327 44 C 290 78, 290 122, 327 156" fill="none" stroke="#e7b9bd" strokeWidth="1.5" />
            {/* stitches */}
            <path d="M243 44 C 280 78, 280 122, 243 156" fill="none" stroke="#c8102e" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
            <path d="M327 44 C 290 78, 290 122, 327 156" fill="none" stroke="#c8102e" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
          </g>
        </svg>
      </div>

      <h1>Play Ball</h1>

      <section className="newsletter">
        {submitted ? (
          <p className="newsletter-success">Thanks for signing up, {email}!</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Sign up for our newsletter</label>
            <div className="newsletter-row">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Sign Up</button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}

export default App
