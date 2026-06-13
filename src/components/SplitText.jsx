import { motion } from 'framer-motion'

export default function SplitText({ text, className = '', delay = 0, tag = 'span' }) {
  const chars = Array.from(text)
  const Tag = motion[tag] || motion.span

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      aria-label={text}
    >
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{
            hidden: { opacity: 0, y: '0.5em' },
            visible: {
              opacity: 1,
              y: '0em',
              transition: { duration: 0.5, ease: [0.2, 0.7, 0.3, 1] },
            },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </Tag>
  )
}