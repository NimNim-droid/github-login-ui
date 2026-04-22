'use client'

import { useState } from 'react'
import styles from './login.module.css'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [status, setStatus]     = useState<'idle'|'error'|'success'>('idle')

  function handleLogin() {
    if (!username || !password) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2500)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStatus('success')
    }, 1500)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div className={styles.page}>

      {/* ── LOGO ── */}
      <div className={styles.logo}>
        <svg height="48" viewBox="0 0 16 16" width="48" fill="white">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
            -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21
            2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04
            2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82
            2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0
            1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </div>

      <h1 className={styles.title}>Sign in to GitHub</h1>

      {/* ── FORM CARD ── */}
      <div className={styles.card}>

        {/* Username */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username">
            Username or email address
          </label>
          <input
            id="username"
            className={`${styles.input} ${status === 'error' ? styles.inputError : ''}`}
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="username"
            autoFocus
          />
        </div>

        {/* Password */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label} htmlFor="password">Password</label>
            <a href="#" className={styles.forgotLink}>Forgot password?</a>
          </div>
          <div className={styles.pwWrap}>
            <input
              id="password"
              className={`${styles.input} ${status === 'error' ? styles.inputError : ''}`}
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.pwToggle}
              onClick={() => setShowPw(!showPw)}
              tabIndex={-1}
            >
              {showPw ? (
                // Eye-off icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                    a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12
                    4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3
                    0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                // Eye icon
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {status === 'error' && (
          <p className={styles.errorMsg}>
            Incorrect username or password.{' '}
            <a href="#">Reset your password</a>.
          </p>
        )}

        {/* Sign in button */}
        <button
          className={`${styles.signInBtn} ${status === 'success' ? styles.signInBtnSuccess : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Signing in…' : status === 'success' ? '✓ Signed in!' : 'Sign in'}
        </button>

        {/* Divider */}
        <div className={styles.divider}><span>or</span></div>

        {/* OAuth buttons */}
        <button className={styles.oauthBtn}>
          {/* Passkey icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a5 5 0 1 0 0 10A5 5 0 0 0 12 1zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM3 20c0-3.87 4.03-7 9-7 .5 0 .99.03 1.47.09M16 17h6m-3-3v6"/>
          </svg>
          Continue with passkey
        </button>

        <button className={styles.oauthBtn}>
          {/* Google icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26
              1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23
              1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43
              8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97
              1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button className={styles.oauthBtn}>
          {/* Apple icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79
              -1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7
              9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0
              2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15
              3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13
              3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83
              1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Continue with Apple
        </button>

      </div>

      {/* Sign up link */}
      <div className={styles.signupBox}>
        New to GitHub?{' '}
        <a href="#" className={styles.signupLink}>Create an account</a>.
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Docs</a>
        <a href="#">Contact GitHub Support</a>
        <a href="#">Manage cookies</a>
        <a href="#">Do not share my personal information</a>
      </footer>

    </div>
  )
}
