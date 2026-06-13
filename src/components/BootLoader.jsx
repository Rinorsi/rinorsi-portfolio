import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Doodle } from './Doodle'

const MODULES = [
  { key: 'MAKER', color: '#ff007f' },
  { key: 'MOD', color: '#00c2d6' },
  { key: 'DATA', color: '#f5b700' },
  { key: 'CONTENT', color: '#14b8a6' },
  { key: 'SHIP', color: '#7c3aed' },
]

const LOGS = [
  '翻出创作工坊 · maker 项目…',
  '装上数据站 · 玩家档案…',
  '塞进 mod 工具箱…',
  '把内容档案码整齐…',
  '打包要发车的素材…',
  '都齐了 · 准备开玩！',
]

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function BootLoader({ onFinish }) {
  const [removed, setRemoved] = useState(prefersReduced)
  const [leaving, setLeaving] = useState(false)
  const [titleIn, setTitleIn] = useState(false)
  const [sprayIn, setSprayIn] = useState(false)
  const [checked, setChecked] = useState(0)
  const [progress, setProgress] = useState(0)
  const [sloganIn, setSloganIn] = useState(false)
  const [log, setLog] = useState('开机中…')

  const timers = useRef([])
  const intervalRef = useRef(null)
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (intervalRef.current) clearInterval(intervalRef.current)
    setLeaving(true)
    window.setTimeout(() => {
      setRemoved(true)
      if (onFinish) onFinish()
    }, 640)
  }, [onFinish])

  useEffect(() => {
    if (prefersReduced) {
      if (onFinish) onFinish()
      return
    }
    document.body.style.overflow = 'hidden'
    const push = (fn, ms) => timers.current.push(window.setTimeout(fn, ms))

    push(() => { setTitleIn(true); setLog('把家当翻出来…') }, 150)
    push(() => setSprayIn(true), 360)

    MODULES.forEach((m, i) => {
      push(() => { setChecked(i + 1); setLog(LOGS[i]) }, 620 + i * 130)
    })

    push(() => {
      let p = 0
      intervalRef.current = window.setInterval(() => {
        p += 3
        if (p >= 100) { p = 100; clearInterval(intervalRef.current) }
        setProgress(p)
      }, 18)
    }, 700)

    push(() => { setSloganIn(true); setLog(LOGS[5]) }, 1700)
    push(() => finish(), 2200)

    return () => {
      timers.current.forEach(clearTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
      document.body.style.overflow = ''
    }
  }, [finish])

  if (removed) return null

  return (
    <div
      className={`boot-loader ${leaving ? 'is-leaving' : ''}`}
      role="presentation"
      onClick={finish}
    >
      <div className="boot-grid" aria-hidden="true" />
      <span className="boot-glow boot-glow-a" aria-hidden="true" />
      <span className="boot-glow boot-glow-b" aria-hidden="true" />

      {/* 涂鸦点缀 */}
      <Doodle shape="crossA" tone="pink" size={38} className="boot-doodle bd-1" />
      <Doodle shape="star" tone="yellow" size={34} className="boot-doodle bd-2" />
      <Doodle shape="spiral" tone="cyan" size={40} className="boot-doodle bd-3" />
      <Doodle shape="crossC" tone="lilac" size={30} className="boot-doodle bd-4" />
      <Doodle shape="burst" tone="pink" size={42} className="boot-doodle bd-5" />
      <Doodle shape="arrow" tone="cyan" size={46} className="boot-doodle bd-6" />

      <div className="boot-top">
        <div className="boot-brand-wrap">
          <div className="boot-brand">
            <span className="boot-brand-dot" />
            云诺羲的档案馆
          </div>
          <div className="boot-sys">正在把脑洞翻出来铺开…</div>
        </div>
        <div className="boot-badge">载入中……</div>
      </div>

      <div className="boot-center">
        <span className={`boot-paintdrip ${sprayIn ? 'on' : ''}`} aria-hidden="true" />
        <div className="boot-title-stage" style={{ '--boot-title-progress': `${progress}%` }}>
          {/* 描边底层（无填充） */}
          <h1 className={`boot-title boot-title-outline ${titleIn ? 'on' : ''}`}>RINORSI</h1>
          {/* 填色层：遮罩宽度随进度增长，做出「镂空字被逐渐填色」 */}
          <div className={`boot-title-fill-mask ${titleIn ? 'on' : ''}`} aria-hidden="true">
            <h1 className="boot-title boot-title-fill">RINORSI</h1>
          </div>
        </div>
        <p className={`boot-slogan ${sloganIn ? 'on' : ''}`}>把想法做成能玩的东西</p>
      </div>

      <div className="boot-bottom">
        <div className="boot-modules">
          {MODULES.map((m, i) => (
            <div key={m.key} className={`boot-mod ${i < checked ? 'on' : ''}`}>
              <span className={`boot-mod-check ${i < checked ? 'drip' : ''}`} style={{ color: m.color }}>
                {i < checked ? '✕' : '○'}
              </span>
              <span className="boot-mod-label">{m.key}</span>
            </div>
          ))}
        </div>

        <div className="boot-progress-row">
          <div className="boot-progress-head">
            <span className="boot-progress-title">
              <span className="boot-star">★</span> 正在加载好玩的点子
            </span>
            <span className="boot-log">{log}</span>
          </div>
          <div className="boot-bar-wrap">
            <div className="boot-bar">
              <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="boot-pct">{progress}%</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="boot-skip"
        onClick={(e) => { e.stopPropagation(); finish() }}
      >
        跳过 ↵
      </button>
    </div>
  )
}
