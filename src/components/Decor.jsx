import React from 'react'

function Star({ className, style, size = 28, color = '#ffd279' }) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.7 6.3 5 10.6 12 12-7 1.4-11.3 5.7-12 12-.7-6.3-5-10.6-12-12C7 10.6 11.3 6.3 12 0z" fill={color} />
    </svg>
  )
}

export default function Decor({ variant = 'hero' }) {
  if (variant === 'hero') {
    return (
      <div className="decor decor-hero" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
        <span className="ring ring-a" />
        <span className="ring ring-b" />
        <span className="pill pill-a" />
        <span className="pill pill-b" />
        <Star className="star star-1" size={40} color="#ffd279" />
        <Star className="star star-2" size={26} color="#7cd4ff" />
        <Star className="star star-3" size={20} color="#ff9ec9" />
        <Star className="star star-4" size={32} color="#b9a6ff" />
        <span className="dots dots-a" />
        <span className="dots dots-b" />
      </div>
    )
  }
  if (variant === 'works') {
    return (
      <div className="decor decor-works" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="ring ring-a" />
        <span className="pill pill-a" />
        <Star className="star star-1" size={30} color="#ffd279" />
        <Star className="star star-2" size={24} color="#7cd4ff" />
        <Star className="star star-3" size={20} color="#b9a6ff" />
        <span className="dots dots-a" />
      </div>
    )
  }
  return (
    <div className="decor decor-soft" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <Star className="star star-1" size={28} color="#ffd279" />
      <Star className="star star-2" size={22} color="#7cd4ff" />
      <span className="dots dots-a" />
    </div>
  )
}