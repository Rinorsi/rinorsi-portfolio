import React from 'react'

/*
 * 手绘涂鸦元素集：每个图形笔画都不一样（叉叉、星星、箭头、螺旋、波浪、爆炸星、圈）
 * 用 SVG path 手绘风（圆头 + 抖动锚点），霓虹色描边，纯矢量零性能成本。
 */

const STROKE = {
  pink: '#ff007f',
  cyan: '#00c2d6',
  yellow: '#f5b700',
  ink: '#121214',
  lilac: '#7c3aed',
}

// 各不相同的叉叉（笔画弯曲方向、粗细都不同）
function CrossA({ color }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M7 6 C18 16 24 22 34 33" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M33 7 C22 17 17 23 6 34" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
function CrossB({ color }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M9 8 C16 18 27 20 32 31" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M31 9 C20 14 18 26 8 32" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}
function CrossC({ color }) {
  return (
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M6 10 C20 14 22 24 33 28" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M30 8 C22 20 16 22 10 33" stroke={color} strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  )
}

// 五角手绘星
function StarSpark({ color }) {
  return (
    <svg viewBox="0 0 44 44" fill="none">
      <path d="M22 4 C24 16 28 20 40 22 C28 24 24 28 22 40 C20 28 16 24 4 22 C16 20 20 16 22 4 Z"
        stroke={color} strokeWidth="3" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// 爆炸星（不规则尖角）
function Burst({ color }) {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <path d="M24 3 L28 17 L41 9 L32 21 L45 26 L31 28 L37 41 L24 32 L13 42 L17 28 L4 25 L18 20 L11 8 L23 17 Z"
        stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// 手绘箭头（弯曲）
function ArrowCurl({ color }) {
  return (
    <svg viewBox="0 0 50 40" fill="none">
      <path d="M5 28 C14 10 30 6 44 14" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M44 14 L36 9 M44 14 L38 22" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 螺旋
function Spiral({ color }) {
  return (
    <svg viewBox="0 0 44 44" fill="none">
      <path d="M22 22 C22 18 26 18 26 22 C26 28 18 28 18 21 C18 12 30 12 30 22 C30 34 14 34 14 21"
        stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 波浪下划线（马克笔笔触）
function Underline({ color }) {
  return (
    <svg viewBox="0 0 90 16" fill="none">
      <path d="M3 9 C18 3 30 13 45 8 C60 3 72 13 87 7" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

// 手绘圈圈
function Loop({ color }) {
  return (
    <svg viewBox="0 0 56 48" fill="none">
      <path d="M30 6 C12 4 6 22 16 34 C26 46 50 42 50 24 C50 8 28 4 20 12"
        stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

// 三连点（马克笔点）
function Dots({ color }) {
  return (
    <svg viewBox="0 0 44 16" fill="none">
      <circle cx="7" cy="8" r="5" fill={color} />
      <circle cx="22" cy="8" r="5" fill={color} />
      <circle cx="37" cy="8" r="5" fill={color} />
    </svg>
  )
}

const SHAPES = {
  crossA: CrossA, crossB: CrossB, crossC: CrossC,
  star: StarSpark, burst: Burst, arrow: ArrowCurl,
  spiral: Spiral, underline: Underline, loop: Loop, dots: Dots,
}

export function Doodle({ shape = 'crossA', tone = 'ink', size = 36, className = '', style }) {
  const Shape = SHAPES[shape] || CrossA
  return (
    <span
      className={`doodle doodle-${shape} ${className}`}
      style={{ width: size, height: 'auto', ...style }}
      aria-hidden="true"
    >
      <Shape color={STROKE[tone] || STROKE.ink} />
    </span>
  )
}

// 区域成组撒点：每个 variant 一组预置位置 + 形态 + 颜色
const SCATTERS = {
  hero: [
    { shape: 'crossA', tone: 'pink', size: 34, top: '14%', left: '6%', rot: -12 },
    { shape: 'star', tone: 'yellow', size: 30, top: '24%', right: '10%', rot: 8 },
    { shape: 'spiral', tone: 'cyan', size: 38, bottom: '22%', left: '4%', rot: 0 },
    { shape: 'crossB', tone: 'lilac', size: 26, bottom: '30%', right: '7%', rot: 14 },
    { shape: 'dots', tone: 'pink', size: 40, top: '50%', left: '2%', rot: -6 },
  ],
  works: [
    { shape: 'burst', tone: 'pink', size: 44, top: '8%', right: '5%', rot: -6 },
    { shape: 'crossC', tone: 'cyan', size: 30, top: '40%', left: '3%', rot: 10 },
    { shape: 'arrow', tone: 'yellow', size: 48, bottom: '12%', right: '8%', rot: -8 },
    { shape: 'crossA', tone: 'lilac', size: 26, bottom: '30%', left: '6%', rot: 16 },
  ],
  about: [
    { shape: 'star', tone: 'pink', size: 32, top: '6%', left: '4%', rot: -10 },
    { shape: 'loop', tone: 'cyan', size: 50, top: '30%', right: '4%', rot: 6 },
    { shape: 'crossB', tone: 'yellow', size: 28, bottom: '14%', left: '8%', rot: 12 },
    { shape: 'dots', tone: 'lilac', size: 38, bottom: '40%', right: '6%', rot: -4 },
  ],
  insight: [
    { shape: 'crossC', tone: 'pink', size: 30, top: '4%', right: '8%', rot: -14 },
    { shape: 'spiral', tone: 'cyan', size: 36, bottom: '8%', left: '4%', rot: 0 },
    { shape: 'star', tone: 'yellow', size: 26, top: '40%', left: '2%', rot: 8 },
  ],
  contact: [
    { shape: 'burst', tone: 'pink', size: 40, top: '14%', left: '10%', rot: -8 },
    { shape: 'star', tone: 'cyan', size: 34, top: '20%', right: '12%', rot: 10 },
    { shape: 'arrow', tone: 'yellow', size: 46, bottom: '24%', left: '14%', rot: 6 },
    { shape: 'crossA', tone: 'lilac', size: 28, bottom: '18%', right: '14%', rot: -12 },
  ],
}

export function DoodleScatter({ variant = 'hero' }) {
  const items = SCATTERS[variant] || SCATTERS.hero
  return (
    <div className="doodle-scatter" aria-hidden="true">
      {items.map((it, i) => (
        <Doodle
          key={i}
          shape={it.shape}
          tone={it.tone}
          size={it.size}
          style={{
            position: 'absolute',
            top: it.top, left: it.left, right: it.right, bottom: it.bottom,
            '--rot': `${it.rot}deg`,
            transform: `rotate(${it.rot}deg)`,
          }}
        />
      ))}
    </div>
  )
}

// 手绘涂鸦分割线（马克笔笔触，每次稍随机方向）
export function DoodleDivider({ tone = 'ink', flip = false }) {
  const color = STROKE[tone] || STROKE.ink
  return (
    <div className={`doodle-divider ${flip ? 'flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 600 24" fill="none" preserveAspectRatio="none">
        <path d="M6 14 C90 4 150 20 240 11 C330 3 400 19 500 9 C545 5 575 14 594 10"
          stroke={color} strokeWidth="3.5" strokeLinecap="round" />
        <path d="M70 18 C120 15 180 20 250 17" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
      <span className="doodle-divider-star">✦</span>
    </div>
  )
}

export default Doodle