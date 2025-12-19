'use client'

import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type SteelButtonProps = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  href?: string
  onClick?: () => void
  className?: string
  fullWidth?: boolean
}

export function SteelButton({
  children,
  type = 'button',
  href,
  onClick,
  className,
  fullWidth = false,
}: SteelButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [hovered, setHovered] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const shineX = useTransform(mouseX, v => v - 100)
  const shineY = useTransform(mouseY, v => v - 100)

  const shineBackground = useMotionTemplate`
    radial-gradient(
      200px circle at ${shineX}px ${shineY}px,
      rgba(255,255,255,0.25),
      rgba(255,255,255,0.1) 40%,
      transparent 70%
    )
  `

  const baseClasses = cn(
    `
    flex flex-row gap-2 items-center justify-center relative overflow-hidden
    px-6 py-3 rounded-lg
    border border-zinc-700
    bg-gradient-to-b from-zinc-500/90 via-zinc-600/80 to-zinc-800
    text-white font-semibold tracking-wide
    shadow-[0_6px_20px_rgba(0,0,0,0.5)]
    `,
    fullWidth && 'w-full',
    className
  )

  const ButtonInner = (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={baseClasses}
    >
      {/* Permanent steel polish - subtle base layer */}
      <div className="absolute inset-0 pointer-events-none
        bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)]
        opacity-50"
      />
      {/* Animated sweep shine - moves on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"
        style={{
          opacity: hovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 100%)',
            width: '200%',
            height: '100%',
          }}
          animate={{
            x: hovered ? ['-100%', '200%'] : '-100%',
          }}
          transition={{
            duration: 1.5,
            repeat: hovered ? Infinity : 0,
            ease: 'linear',
          }}
        />
      </motion.div>
      {/* Cursor-following gloss - enhanced */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{ 
          background: shineBackground, 
          opacity: hovered ? 0.9 : 0,
          mixBlendMode: 'overlay',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      {/* Top highlight for depth */}
      <div className="absolute inset-0 rounded-lg 
        bg-gradient-to-b from-white/10 via-transparent to-transparent
        pointer-events-none"
      />
      {/* Inner bevel - enhanced */}
      <div className="absolute inset-0 rounded-lg 
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.3)]" 
      />
      <span className="relative z-10 flex flex-row gap-2 items-center justify-center">{children}</span>
    </motion.button>
  )

  if (href) return <Link href={href}>{ButtonInner}</Link>

  return ButtonInner
}
