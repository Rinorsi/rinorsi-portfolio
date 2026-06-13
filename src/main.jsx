import React, { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, ArrowDown, Compass, Palette, Gamepad2, Layers, Send, Play, Pause, Volume2, VolumeX, Code, Rocket, Video } from 'lucide-react'
import Aurora from './components/Aurora'
import SplitText from './components/SplitText'
import Decor from './components/Decor'
import './styles.css'

const profile = {
  name: '云诺羲',
  alias: 'Rinorsi',
  role: 'AI 游戏创作实习 · 在找',
  status: '寻找 AI 游戏创作 / 游戏策划实习',
  email: 'Rinorsi@163.com',
  major: '数字媒体技术',
  motifs: ['游戏玩家', 'Vibe Coding', '做过能上线的东西', '会剪视频做内容'],
}

const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const orbWords = ['Vibe Coding', '数据构建', 'TapTap Maker', 'Mod', '数据站', '内容']

const stats = [
  { value: '300万+', label: '内容总播放' },
  { value: '1万+', label: '全网粉丝' },
  { value: '4万+', label: 'Mod 下载' },
  { value: '编辑精选', label: 'TapTap 奖项' },
]

const works = [
  {
    index: '01',
    title: '幻海航迹',
    // en: 'Mirage Wake',
    type: 'TapTap Maker · 3D 涂色竞技',
    role: '策划 / 美术 / 玩法调试',
    year: '2026',
    shot: '游戏内画面',
    hook: '全部由AI制作的涂色竞技游戏。',
    start: '有一天，我在 Maker 看到支持 Tripo 生成模型，于是一次对3D游戏的大胆尝试开始了……',
    solve: '核心改成「船尾留下彩色航迹」，让移动本身变成抢地盘，再围绕三种打法填充内容，一个涂色竞技游戏就这么诞生了。',
    result: '现在还在打磨，能直接点进去试玩。',
    metric: { value: 'TapTap 制造', label: 'AI 工具创作' },
    tags: ['玩法策划', '数值调试', '局内美术'],
    link: 'https://maker.taptap.cn/shares/nzlums',
    linkText: '点进去试玩',
    media: { type: 'video', src: assetPath('/assets/mirage-wake.mp4'), poster: assetPath('/works/huanhai.jpg') },
  },
  {
    index: '02',
    title: '绝尘营地',
    // en: 'Drift Camp',
    type: '《绝尘漂移》玩家涂装分享社区',
    role: '一个人从零搭起来',
    year: '2025',
    shot: '社区站截图',
    hook: '玩家做了好看的涂装，却没地方好好发出来。',
    start: '社区里大家想分享自己的涂装作品，但缺一个能上传、分类、互相看见的地方。',
    solve: '我自己把社区站从前端到后端搭了起来，做了上传、分类检索和点赞评论，还拿它去参加了 TapTap 的工具创作大赛。',
    result: '收了 500 多份玩家原创涂装，拿了大赛编辑精选奖。',
    metric: { value: '500+', label: '玩家原创涂装' },
    tags: ['独立开发', '页面设计', '编辑精选奖'],
    link: 'https://hot.seimu.cn/',
    linkText: '看看社区',
    media: { type: 'image', src: assetPath('/assets/drift-camp.png') },
  },
  {
    index: '03',
    title: '王牌竞速 Wiki',
    // en: 'Ace Racing Data',
    type: '《王牌竞速》数据查询站 + 内容账号',
    role: '项目负责人',
    year: '2024',
    shot: '数据站截图',
    hook: '玩家老是找不到车辆参数、赛道这些数据。',
    start: '游戏里的数据散、难查，有些参数官方根本没有发出来，玩家想对比车辆和赛道时基本只能翻评论区。',
    solve: '我把核心数据结构化，做成能直接查的数据站，又顺手开了内容号跟着版本更新发资讯，让「查数据」和「看内容」连成一条路。',
    result: '帮 1 万多名玩家查到了想要的东西，内容号单条最高播放 20 万+。',
    metric: { value: '1万+', label: '玩家使用' },
    tags: ['项目主导', '数据整理', '内容运营'],
    link: 'https://reca.seimu.cn/',
    linkText: '看看数据站',
    media: { type: 'image', src: assetPath('/assets/reca.png') },
  },
  {
    index: '04',
    title: 'CAD Editor',
    // en: 'Minecraft Mod',
    type: 'Minecraft 辅助创作 Mod',
    role: '独立开发',
    year: '2025',
    shot: 'Mod 使用截图',
    hook: '在 Minecraft 里手动编辑物品数据，太折磨人了。',
    start: '想客制化物品和实体的玩家，要面对一堆繁琐的原始数据，门槛很高。',
    solve: '我做了个能直接调参数、可视化编辑物品/实体的 Mod，兼容多个版本，也跟着玩家反馈一直修问题。',
    result: 'Modrinth 上下载过了 4 万，成了不少服主和玩家的常用工具。',
    metric: { value: '4万+', label: 'Modrinth 下载' },
    tags: ['工具开发', '听玩家需求', '多语言'],
    link: 'https://modrinth.com/project/cad-editor/',
    linkText: '看看平台',
    media: { type: 'image', src: assetPath('/assets/cad-editor.png') },
  },
]

const abilities = [
  { icon: Gamepad2, en: 'Play & Break Down', title: '懂游戏，也拆得透', text: '玩得多，也爱琢磨一个游戏为什么好玩。会拆包学习——「幻海航迹」前身就是拆了某款赛车游戏改的。' },
  { icon: Sparkles, en: 'Vibe Coding', title: '用 AI 把想法做出来', text: '靠 Cursor、ChatGPT、Gemini 这套 AI 工作流干活，不纠结代码，精力放在玩法和体验上。' },
  { icon: Layers, en: 'Ship It', title: '动手快，做的有人用', text: '想法不止停在脑子里：游戏能上线试玩，Mod 下载过 4 万，社区收了 500 多份作品，还跟着反馈一直改。' },
  { icon: Palette, en: 'Content & Visual', title: '会做内容，也管视觉', text: '自己剪视频、写脚本、做网感短视频，全网攒了一万多粉、三百多万播放。' },
]

const skills = [
  { name: 'TapTap Maker', cat: 'gamedev' },
  { name: '玩法策划', cat: 'gamedev' },
  { name: '数值调试', cat: 'gamedev' },
  { name: 'Vibe Coding', cat: 'ai' },
  { name: 'Cursor', cat: 'ai' },
  { name: 'ChatGPT / Gemini', cat: 'ai' },
  { name: 'Mod 开发', cat: 'tech' },
  { name: '数据站搭建', cat: 'tech' },
  { name: '社区运营', cat: 'ops' },
  { name: '视频剪辑', cat: 'ops' },
]

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'works', label: '作品' },
  { id: 'insight', label: '认知' },
  { id: 'about', label: '关于我' },
  { id: 'contact', label: '联系' },
]

const insights = [
  {
    index: '01',
    en: 'LOWER START',
    title: 'AI 确实让我更敢开坑',
    text: '以前我脑子里有个想法，第一反应经常是：这个我不会写，算了。现在不太一样了，AI 能先帮我把东西跑起来。可跑起来以后才发现，后面还有一堆事：手感不对、界面散、数值怪，哪个都得自己慢慢调。',
  },
  {
    index: '02',
    en: 'CROSS-CHECK',
    title: '我不会一直相信同一个模型',
    text: '这个是我自己踩出来的。一个模型写了一套东西，再让它自己检查，它有时候真的会很自信地说没问题。后来我就习惯让 GPT 写大结构，让 Claude 专门挑刺，再把意见来回过一遍。不是为了显得工具多，主要是怕它们各自活在自己的写法里。',
  },
  {
    index: '03',
    en: 'LANDS IN MAKER',
    title: '好看的 Demo 不等于游戏里也好看',
    text: '我前期会用 Gemini 或网页原型找视觉感觉，但进了 TapTap Maker 以后，经常不是原来那个味。HTML 能写出来的效果，Maker 里不一定适合照搬。所以我会先把基础 UI 磨成一套能复用的规则，后面所有界面都尽量沿着这套来，不然越做越乱。',
  },
]

const navIcons = {
  hero: Compass,
  works: Gamepad2,
  insight: Sparkles,
  about: Palette,
  contact: Send,
}

function Nav({ activeSection = 'hero' }) {
  return (
    <nav className="rail-nav" aria-label="导航">
      <a className="rail-brand" href="#hero" aria-label={profile.alias}>{profile.alias}</a>
      <div className="rail-dots">
        {navItems.map((n) => (
          <a
            className={`rail-dot ${activeSection === n.id ? 'active' : ''}`}
            href={`#${n.id}`}
            key={n.id}
          >
            <span className="rail-dot-mark" />
            <span className="rail-dot-label">{n.label}</span>
          </a>
        ))}
      </div>
      <a className="rail-cta" href={`mailto:${profile.email}`} aria-label="写信联系">
        <ArrowUpRight size={16} />
      </a>
    </nav>
  )
}

function HeroAvatar() {
  return (
    <motion.div
      className="hero-avatar-wrapper"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic backdrop glows */}
      <div className="avatar-glow-blob" />
      <div className="avatar-glow-blob-secondary" />

      {/* Outer target bracket layout */}
      <div className="avatar-hud-frame">
        {/* Corner Brackets */}
        <span className="hud-bracket top-left" />
        <span className="hud-bracket top-right" />
        <span className="hud-bracket bottom-left" />
        <span className="hud-bracket bottom-right" />

        {/* Small UI indicator lines */}
        <div className="hud-line-horizontal" />
        <span className="hud-system-status">SYS.ACTIVE // OPR.2026</span>
        <span className="hud-system-mode">MODE: PLANNER</span>

        {/* Avatar squircle stage */}
        <div className="hero-avatar-squircle">
          <img className="hero-avatar-img" src={assetPath('/assets/avatar.jpg')} alt="云诺羲 Rinorsi" />
          <div className="avatar-scanline" />
        </div>
      </div>

      {/* Floating horizontal tags (Upright and clean) */}
      <div className="floating-chip chip-1">
        <span className="chip-dot pink" />
        <span>TapTap Maker</span>
      </div>
      <div className="floating-chip chip-2">
        <span className="chip-dot sky" />
        <span>Vibe Coding</span>
      </div>
      <div className="floating-chip chip-3">
        <span className="chip-dot mint" />
        <span>Cursor</span>
      </div>
      <div className="floating-chip chip-4">
        <span className="chip-dot lilac" />
        <span>数据站</span>
      </div>
    </motion.div>
  )
}

function PhonePlayer({ src, poster }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(true)

  async function toggle() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      setLoading(true)
      try {
        await v.play()
        setPlaying(true)
        setStarted(true)
      } catch {
        setPlaying(false)
      } finally {
        setLoading(false)
      }
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  function toggleMuted(event) {
    event.stopPropagation()
    setMuted((value) => !value)
  }

  function updateProgress() {
    const v = videoRef.current
    if (!v || !Number.isFinite(v.duration) || v.duration === 0) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  return (
    <div className="phone-frame" onClick={toggle}>
      <span className="phone-notch" />
      <video
        ref={videoRef}
        className="phone-video"
        src={src}
        poster={poster}
        playsInline
        preload="none"
        loop
        muted={muted}
        onLoadStart={() => setLoading(true)}
        onWaiting={() => setLoading(true)}
        onCanPlay={() => setLoading(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={updateProgress}
      />
      <div className="phone-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <button
        className="phone-sound-btn"
        aria-label={muted ? '打开声音' : '关闭声音'}
        type="button"
        onClick={toggleMuted}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <button
        className={`phone-play-btn ${started ? 'has-started' : ''} ${playing ? 'is-playing' : ''} ${loading ? 'is-loading' : ''}`}
        aria-label={playing ? '暂停' : '播放'}
        type="button"
      >
        <span className="phone-play-icon">{playing ? <Pause size={26} /> : <Play size={26} />}</span>
        {loading && <span className="phone-loading-text">正在加载</span>}
      </button>
    </div>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero section-full">
      <div className="hero-flow" />
      <div className="hero-tint" aria-hidden="true" />
      <Aurora colors={['#3b82f6', '#818cf8', '#dbeafe', '#fafaf9']} amplitude={1.1} />
      <Decor variant="hero" />
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <div className="status-badge">
            <span className="status-dot" />
            {/* <span>2027届毕业生</span> */}
          </div>

          <h1 className="hero-title" style={{ minHeight: '136px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <SplitText text="你好，我是" tag="span" className="hero-hi" />
            <span
              className="hl"
              style={{
                background: 'linear-gradient(100deg, var(--ink) 0%, var(--sky) 80%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              云诺羲 Rinorsi
            </span>
          </h1>

          <div className="hero-statement">
            <span className="hero-statement-en">I MAKE PLAYABLE IDEAS.</span>
            <span className="hero-statement-zh">把想法做成能玩的东西。</span>
          </div>

          <div className="hero-desc">
            <span className="hero-quote">
              "将来只有两种人做游戏才有意义：0.0001% 组成极精锐团队、做前所未有之物的人才；和 99% 满足自己想法的业余爱好者。"
              <em className="hero-quote-by">— 蔡浩宇</em>
            </span>
          </div>

          <div className="hero-stickers">
            <div className="sticker-tag tag-game"><span className="tag-index">01</span> 游戏玩家</div>
            <div className="sticker-tag tag-code"><span className="tag-index">02</span> Vibe Coding</div>
            <div className="sticker-tag tag-ship"><span className="tag-index">03</span> 做过能上线的东西</div>
            <div className="sticker-tag tag-video"><span className="tag-index">04</span> 会剪视频做内容</div>
          </div>

          <div className="hero-actions">
            <a className="primary-btn" href="#works">浏览作品 <ArrowUpRight size={18} /></a>
            <a className="ghost-btn" href={`mailto:${profile.email}`}>联系我</a>
          </div>
        </div>

        <HeroAvatar />
      </div>
      <div className="hero-scroll"><ArrowDown size={18} /> SCROLL</div>
    </section>
  )
}

function Works() {
  return (
    <section id="works" className="works">
      <Decor variant="works" />
      <div className="works-head page-shell">
        <div className="works-head-title-bar">
          <div>
            <p className="eyebrow"><Compass size={16} /> FEATURED WORKS</p>
            <h2 className="section-title">我做过的东西</h2>
          </div>
          <div className="dot-matrix-patch" />
        </div>
        <p className="works-sub">用作品说话：每一次动手，都是为了解决一个真实的体验痛点。</p>
      </div>
      
      <div className="works-editorial-list page-shell">
        {works.map((w) => (
          <motion.article
            key={w.title}
            className={`work-editorial-row ${w.media && w.media.type === 'video' ? 'is-portrait' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Giant background number watermark */}
            <div className="work-row-watermark" aria-hidden="true">{w.index}</div>
            {/* 左侧：媒体展示框 (实机视频/浏览器 Mockup) */}
            <div className="work-editorial-media">
              {w.media && w.media.type === 'video' ? (
                <div className="work-phone-stage">
                  <PhonePlayer src={w.media.src} poster={w.media.poster} />
                </div>
              ) : (
                <div className="browser-mockup">
                  <div className="browser-bar">
                    <span className="browser-dot close" />
                    <span className="browser-dot minimize" />
                    <span className="browser-dot maximize" />
                    <span className="browser-url">{w.link ? w.link.replace('https://', '').replace('http://', '').split('/')[0] : 'workspace.rinorsi'}</span>
                  </div>
                  <div className="browser-content">
                    <img className="browser-image" src={w.media.src} alt={w.title} loading="lazy" />
                  </div>
                </div>
              )}
            </div>

            {/* 右侧：结构化项目档案 */}
            <div className="work-editorial-info">
              <div className="work-archive-header">
                <span className="work-archive-index">[ ARCHIVE NO. {w.index} ]</span>
                <h3 className="work-editorial-title">
                  {w.title} <span className="work-editorial-en">{w.en}</span>
                </h3>
              </div>

              {/* High-density metadata spec table */}
              <div className="work-spec-table">
                <div className="work-spec-row">
                  <span className="spec-label">ROLE / 角色</span>
                  <span className="spec-value">{w.role}</span>
                </div>
                <div className="work-spec-row">
                  <span className="spec-label">GENRE / 类型</span>
                  <span className="spec-value">{w.type}</span>
                </div>
                <div className="work-spec-row">
                  <span className="spec-label">IMPACT / 成果</span>
                  <span className="spec-value">{w.metric.value} <span className="spec-value-sub">({w.metric.label})</span></span>
                </div>
                <div className="work-spec-row">
                  <span className="spec-label">YEAR / 年份</span>
                  <span className="spec-value">{w.year}</span>
                </div>
              </div>

              <div className="work-editorial-body">
                <p className="work-editorial-desc">
                  {w.start} {w.solve} {w.result}
                </p>

                <div className="work-editorial-footer">
                  <div className="work-editorial-tags">
                    {w.tags.map((t) => <span key={t} className="tag-chip">{t}</span>)}
                  </div>
                  <a className="work-editorial-cta" href={w.link} target="_blank" rel="noreferrer">
                    {w.linkText} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Insight() {
  return (
    <section id="insight" className="insight page-shell section-pad">
      <Decor variant="soft" />
      <div className="insight-head">
        <div className="insight-head-left">
          <p className="eyebrow"><Sparkles size={16} /> MY TAKE ON AI GAMEDEV</p>
          <div className="insight-title-bar">
            <h2 className="section-title">我对 AI 游戏开发的理解</h2>
            <div className="dot-matrix-patch" />
          </div>
          <p className="insight-head-meta">Vibe Coding 的这一年，我把踩过的坑和想法整理成了下面三条。</p>
        </div>
        <div className="insight-head-right">
          <p className="insight-lead">
            我一开始用 AI 做游戏，其实想得挺简单：我只管想，剩下的都让他解决。但真做项目以后发现，很多想法和我的预期都有所不符，
            不过 AI 最厉害的是有一个想法就可以快速进入 MVP 阶段，不需要考虑成本。
          </p>
        </div>
      </div>
      <div className="insight-list">
        {insights.map((it, i) => (
          <motion.article
            key={it.index}
            className="insight-item"
            data-num={it.index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="insight-item-head">
              <span className="insight-num">{it.index}</span>
              <span className="insight-en">{it.en}</span>
            </div>
            <h3 className="insight-title">{it.title}</h3>
            <p className="insight-text">{it.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about page-shell section-pad">
      <Decor variant="soft" />
      
      {/* 报纸杂志级：大网格分栏 */}
      <div className="about-bento-grid">
        <div className="about-bento-profile">
          <div className="about-head-title-bar">
            <div>
              <p className="eyebrow"><Compass size={16} /> ABOUT ME</p>
              <h2 className="section-title">关于我</h2>
            </div>
            <div className="dot-matrix-patch" />
          </div>
          {/* <p className="profile-text">
            我是数字媒体技术专业的学生。比起在简历上堆一串漂亮的形容词，我更愿意直接拿做出来的东西跟你聊——
            能在 TapTap 上线试玩的游戏、被几万人下载的 Mod、玩家自发用起来的社区，还有我自己运营的游戏内容号。
          </p> */}
          <p className="profile-text profile-text-sub">
            我大概就是那 99% ，一位有想法的游戏爱好者。
            靠着一腔热血，借助现代化的AI工具去做了很多能拿得出手的东西。
            工具一直在换，但"能把一件事踏实做完"这件事，对我来说是一成不变的。
          </p>
        </div>
        
        <div className="about-bento-dossier">
          <div className="dossier-header-game">
            <span className="dossier-header-title">求职意向 & 联络方式</span>
          </div>
          <div className="dossier-cell">
            <span className="dossier-label">当前状态</span>
            <strong className="dossier-value">{profile.status}</strong>
          </div>
          <div className="dossier-cell">
            <span className="dossier-label">专业背景</span>
            <strong className="dossier-value">{profile.major}</strong>
          </div>
          <div className="dossier-cell">
            <span className="dossier-label">联系邮箱</span>
            <strong className="dossier-value">{profile.email}</strong>
          </div>
        </div>

        <div className="about-bento-skills">
          <h4 className="cloud-title">技能与工具集</h4>
          <div className="skill-cloud">
            {skills.map((s) => (
              <span className={`skill-chip cat-${s.cat}`} key={s.name}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <div className="about-bento-stats">
          <div className="stats-bento-row">
            {stats.map((s, i) => (
              <motion.div
                key={s.label} className="stat-bento-cell"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="stat-label-en">{s.label}</span>
                <span className="stat-val-en">{s.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 四大能力排版：去掉卡片，改用 2x2 线框大图纸格栅布局 */}
      <div className="ability-editorial-box">
        <div className="ability-box-header">
          <span>核心能力维度</span>
          <span>ESTABLISHED 2026</span>
        </div>
        <div className="ability-grid-layout">
          {abilities.map(({ icon: Icon, en, title, text }, i) => (
            <motion.div
              key={title} className="ability-grid-cell"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div className="ability-cell-top">
                <div className="ability-icon-wrap"><Icon size={18} /></div>
                <span className="ability-en-label">{en}</span>
              </div>
              <h3 className="ability-cell-title">{title}</h3>
              <p className="ability-cell-text">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact section-full">
      <Aurora colors={['#e0e7ff', '#dbeafe', '#f1f5f9']} amplitude={0.9} />
      <div className="contact-inner page-shell">
        <p className="eyebrow"><Send size={16} /> NEXT QUEST</p>
        <h2 className="contact-title">
          <SplitText text="想做点好玩的，一起？" />
        </h2>
        <p className="contact-sub"></p>
        
        <a className="contact-mail-link" href={`mailto:${profile.email}`}>
          <span className="contact-mail-label">EMAIL // 给我写信</span>
          <span className="contact-mail-address">{profile.email} <ArrowUpRight size={28} /></span>
        </a>

        <div className="contact-hud-status">
          <div className="status-item"><span className="status-dot green" /> 在找 实习</div>
          <div className="status-item"><span className="status-dot blue" /> {profile.name} · {profile.alias}</div>
          <div className="status-item"><span className="status-dot purple" /> {profile.major}</div>
        </div>
      </div>
      <footer className="footer">
        <span>© 2026 {profile.name} {profile.alias}</span>
        <span>{profile.role}</span>
      </footer>
    </section>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'works', 'insight', 'about', 'contact']
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
    }
  }, [])

  return (
    <main>
      <div className="noise-overlay" aria-hidden="true" />
      <Nav activeSection={activeSection} />
      <Hero />
      <Works />
      <Insight />
      <About />
      <Contact />
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
