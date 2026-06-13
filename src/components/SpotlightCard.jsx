import { useRef, useState } from 'react'

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: '50%', y: '50%' })
  const [opacity, setOpacity] = useState(0)

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` })
  }

  return (
    <div
      ref={ref}
      className={`spotlight-card ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* 融合双色渐变，带来柔和高级的水光漫反射效果 */}
      <div
        className="spotlight-glow"
        style={{
          opacity,
          background: `
            radial-gradient(circle 180px at ${pos.x} ${pos.y}, rgba(109, 184, 255, 0.22), transparent 80%),
            radial-gradient(circle 280px at ${pos.x} ${pos.y}, rgba(185, 166, 255, 0.16), transparent 80%)
          `,
        }}
      />
      {children}
    </div>
  )
}