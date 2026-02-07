import { useState, useCallback } from 'react'
import './App.css'

// Floating hearts background
function FloatingHearts() {
  const hearts = ['💕', '❤️', '💗', '💖', '💘', '💝', '🌸', '🩷', '💐']
  const [items] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      left: Math.random() * 100,
      size: 0.8 + Math.random() * 1.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
    }))
  )

  return (
    <div className="floating-hearts">
      {items.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  )
}

// Sparkles
function Sparkles() {
  const [sparkles] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 0.6 + Math.random() * 1,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    }))
  )

  return (
    <div className="sparkle-container">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}rem`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        >
          ✨
        </span>
      ))}
    </div>
  )
}

// Peony corner decorations
function PeonyCorners() {
  return (
    <>
      <div className="peony-corner peony-top-left">🌸🌺</div>
      <div className="peony-corner peony-top-right">🌺🌸</div>
      <div className="peony-corner peony-bottom-left">🌷🌸</div>
      <div className="peony-corner peony-bottom-right">🌸🌷</div>
    </>
  )
}

// Peony SVG decorations for extra elegance
function PeonySVG({ className }) {
  return (
    <svg
      className={`peony-decoration ${className}`}
      width="180"
      height="180"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Peony petals */}
      <g opacity="0.7">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="100"
            cy="100"
            rx="35"
            ry="60"
            fill={angle % 90 === 0 ? '#f48fb1' : '#f8bbd0'}
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="25" fill="#ec407a" />
        <circle cx="100" cy="100" r="15" fill="#f06292" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={`inner-${angle}`}
            cx="100"
            cy="100"
            rx="12"
            ry="30"
            fill="#f8bbd0"
            opacity="0.6"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
      </g>
    </svg>
  )
}

// Confetti burst on celebration
function Confetti() {
  const [pieces] = useState(() => {
    const emojis = ['💕', '❤️', '💗', '🌸', '✨', '💖', '🩷', '🌺', '💐', '🎀']
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 0.5,
      size: 1 + Math.random() * 1.5,
    }))
  })

  return (
    <div className="confetti-container">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

// Heart divider
function HeartDivider() {
  return (
    <div className="heart-divider">
      <span className="line" />
      <span>💕</span>
      <span className="line" />
    </div>
  )
}

// ==================== PAGES ====================

// Page 1: Hiba Only gate
function Page1({ onNext }) {
  return (
    <div className="card-container" key="page1">
      <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>💌</div>
      <h1 className="page-title">You Have a Special Message</h1>
      <HeartDivider />
      <p className="page-subtitle">This is for someone very special...</p>
      <button className="valentine-btn primary" onClick={onNext}>
        Click Here if Hiba Only 💕
      </button>
    </div>
  )
}

// "It's a Match" overlay
function ItsAMatch({ onDone }) {
  const [fading, setFading] = useState(false)

  useState(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2200)
    const doneTimer = setTimeout(() => onDone(), 3000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  })

  return (
    <div className={`match-overlay ${fading ? 'match-fade-out' : ''}`}>
      <div className="match-content">
        <div className="match-hearts">💕</div>
        <h1 className="match-title">It&rsquo;s a Match!</h1>
        <p className="match-subtitle">Identity confirmed — Welcome, Hiba 💗</p>
        <div className="match-glow" />
      </div>
    </div>
  )
}

// Page 2: Identity verification
function IdentityPage({ onNext }) {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' })
  const [errors, setErrors] = useState({ q1: '', q2: '', q3: '' })
  const [showMatch, setShowMatch] = useState(false)

  const checkAnswer = (key, value) => {
    const trimmed = value.trim()
    if (!trimmed) return false

    if (key === 'q1') {
      return /^sanborn(\s+elementary)?(\s+school)?$/i.test(trimmed)
    }
    if (key === 'q2') {
      return /^al[-\s]?qassimi$/i.test(trimmed)
    }
    if (key === 'q3') {
      return /^mercy\s*me$/i.test(trimmed)
    }
    return false
  }

  const handleSubmit = () => {
    const newErrors = {}
    let allCorrect = true

    if (!checkAnswer('q1', answers.q1)) {
      newErrors.q1 = 'Hmm, that doesn\'t seem right. Try again!'
      allCorrect = false
    }
    if (!checkAnswer('q2', answers.q2)) {
      newErrors.q2 = 'That\'s not quite it. Try again!'
      allCorrect = false
    }
    if (!checkAnswer('q3', answers.q3)) {
      newErrors.q3 = 'Not quite! Think back to that day...'
      allCorrect = false
    }

    setErrors(newErrors)

    if (allCorrect) {
      setShowMatch(true)
    }
  }

  if (showMatch) {
    return <ItsAMatch onDone={onNext} />
  }

  return (
    <div className="card-container" key="identity">
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔐</div>
      <h1 className="page-title">Confirm Your Identity</h1>
      <HeartDivider />
      <p className="page-subtitle">
        Dini can only ask Hiba to be his Valentine so we have to confirm your identity.
      </p>

      <div className="identity-questions">
        <div className="identity-question">
          <label className="identity-label">
            What was the name of the school you went to for 2nd grade?
          </label>
          <input
            type="text"
            className={`identity-input ${errors.q1 ? 'input-error' : ''}`}
            value={answers.q1}
            onChange={(e) => {
              setAnswers({ ...answers, q1: e.target.value })
              if (errors.q1) setErrors({ ...errors, q1: '' })
            }}
            placeholder="Type your answer..."
          />
          {errors.q1 && <span className="error-text">{errors.q1}</span>}
        </div>

        <div className="identity-question">
          <label className="identity-label">
            What's the name of the hospital your mother worked at?
          </label>
          <input
            type="text"
            className={`identity-input ${errors.q2 ? 'input-error' : ''}`}
            value={answers.q2}
            onChange={(e) => {
              setAnswers({ ...answers, q2: e.target.value })
              if (errors.q2) setErrors({ ...errors, q2: '' })
            }}
            placeholder="Type your answer..."
          />
          {errors.q2 && <span className="error-text">{errors.q2}</span>}
        </div>

        <div className="identity-question">
          <label className="identity-label">
            What was the name of restaurant we went to on March 5th, 2022?
          </label>
          <input
            type="text"
            className={`identity-input ${errors.q3 ? 'input-error' : ''}`}
            value={answers.q3}
            onChange={(e) => {
              setAnswers({ ...answers, q3: e.target.value })
              if (errors.q3) setErrors({ ...errors, q3: '' })
            }}
            placeholder="Type your answer..."
          />
          {errors.q3 && <span className="error-text">{errors.q3}</span>}
        </div>

        <button className="valentine-btn primary" onClick={handleSubmit}>
          Verify My Identity 💕
        </button>
      </div>
    </div>
  )
}

// Page 3: Message tease
function Page2({ onNext }) {
  return (
    <div className="card-container" key="page2">
      <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🌹</div>
      <h1 className="page-title">Welcome, Hiba</h1>
      <HeartDivider />
      <p className="page-subtitle">Someone has something to tell you...</p>
      <button className="valentine-btn primary" onClick={onNext}>
        A Message for My Beautiful Lady 💗
      </button>
    </div>
  )
}

// Page 3: The love message
function Page3({ onNext }) {
  return (
    <div className="card-container" key="page3">
      <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💝</div>
      <h1 className="page-title">My Dearest Hiba</h1>
      <HeartDivider />
      <div className="love-message">
        <p>
          You are the definition of my valentine and I would love to be yours.
          I love you so much and want to celebrate everyday with you. You're
          beautiful in every stretch of the imagination and I am so lucky to
          call you mine.
        </p>
        <div className="signature">Forever Yours 💕</div>
      </div>
      <div className="next-btn-wrapper">
        <button className="valentine-btn primary" onClick={onNext}>
          Continue 💕
        </button>
      </div>
    </div>
  )
}

// Page 4: Will you be my valentine? (Yes / Yes)
function Page4({ onNext }) {
  return (
    <div className="card-container" key="page4">
      <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>💍</div>
      <h2 className="valentine-question">Will You Be My Valentine?</h2>
      <HeartDivider />
      <div className="yes-buttons">
        <button className="valentine-btn primary" onClick={onNext}>
          Yes 💖
        </button>
        <button className="valentine-btn secondary" onClick={onNext}>
          Yes 💗
        </button>
      </div>
    </div>
  )
}

// Page 5: Celebration
function Page5() {
  return (
    <>
      <Confetti />
      <div className="card-container" key="page5">
        <div className="celebration">
          <img src="/us.jpg" alt="Us" className="celebration-photo" />
          <HeartDivider />
          <p className="celebration-subtext">
            Happy Valentine's Day, Hiba!
          </p>
          <p
            className="celebration-subtext"
            style={{ marginTop: '10px', fontSize: '1rem' }}
          >
            I love you more than words can express 💕
          </p>
          <div style={{ marginTop: '25px', fontSize: '2.5rem' }}>
            🌹🌸💐🌺🌷
          </div>
        </div>
      </div>
    </>
  )
}

// ==================== APP ====================

function App() {
  const [page, setPage] = useState(0)

  const nextPage = useCallback(() => {
    setPage((p) => p + 1)
  }, [])

  const pages = [
    <Page1 onNext={nextPage} />,
    <IdentityPage onNext={nextPage} />,
    <Page2 onNext={nextPage} />,
    <Page3 onNext={nextPage} />,
    <Page4 onNext={nextPage} />,
    <Page5 />,
  ]

  return (
    <>
      <FloatingHearts />
      <Sparkles />
      <PeonyCorners />
      <PeonySVG className="top-left" />
      <PeonySVG className="top-right" />
      <PeonySVG className="bottom-left" />
      <PeonySVG className="bottom-right" />
      <div className="valentine-app">{pages[page]}</div>
    </>
  )
}

export default App
